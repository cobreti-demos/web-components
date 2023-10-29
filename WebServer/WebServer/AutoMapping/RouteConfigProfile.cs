using AutoMapper;
using WebServer.Models.RouteConfig;
using WebServer.ReverseProxy.Config.Route;

namespace WebServer.AutoMapping;

public class RouteConfigProfile : Profile
{
    public RouteConfigProfile()
    {
        CreateMap<MutableRouteConfig, RouteConfigDto>()
            .ForMember(dest => dest.Transforms, 
                opt => opt.MapFrom(src => src.Transforms.ToRouteTransforms()));
        CreateMap<MutableRouteMatch, RouteMatchDto>();
    }
}
