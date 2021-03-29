import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActiviyStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list();
      runInAction(() => {
        activities.forEach((activity) => {
          this.setActivity(activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingInitial = false;
      });
    }
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      this.loadingInitial = false;
    } else {
      try {
        console.log(id);
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        this.selectedActivity = activity;
        runInAction(() => {
          this.loadingInitial = false;
        });
      } catch (error) {
        console.log(error);
        runInAction(() => {
          this.loadingInitial = false;
        });
      }
    }
    return activity;
  };

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split("T")[0];
    this.activityRegistry.set(activity.id, activity);
  };

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  // selectActivty = async (id: string) => {
  //   this.selectedActivity = this.activityRegistry.get(id);
  // };

  // cancelSelectedActivity = async () => {
  //   this.selectedActivity = undefined;
  // };

  // openForm = async (id?: string) => {
  //   id ? this.selectActivty(id) : this.cancelSelectedActivity();
  //   this.editMode = true;
  // };

  // closeForm = async () => {
  //   this.editMode = false;
  // };

  createActivity = async (activity: Activity) => {
    console.log("1.1.1");
    this.loading = true;
    try {
      console.log("1.1.2");
      await agent.Activities.create(activity);
      runInAction(() => {
        console.log("1.1.3");
        this.activityRegistry.set(activity.id, activity);
        console.log("1.1.4");
        this.selectedActivity = activity;
        console.log("1.1.5");
        this.editMode = false;
        console.log("1.1.6");
        this.loading = false;
        console.log("1.1.7");
      });
    } catch (error) {
      console.log("1.1.4");
      console.log(error);
      runInAction(() => {
        console.log("1.1.5");
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        if (this.selectedActivity?.id === id) {
        }
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
