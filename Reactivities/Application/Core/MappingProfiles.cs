using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>()
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null)); 
        }
    }
}