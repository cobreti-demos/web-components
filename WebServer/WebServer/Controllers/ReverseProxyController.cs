using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebServer.Models.RouteConfig;
using WebServer.ReverseProxy;

namespace WebServer.Controllers;

public class ReverseProxyController : Controller
{
    private IMapper _mapper;
    private IRoutesConfigProvider _routesConfigProvider;
    
    public ReverseProxyController(IRoutesConfigProvider routesConfigProvider, IMapper mapper)
    {
        _routesConfigProvider = routesConfigProvider;
        _mapper = mapper;
    }
    
    [HttpGet("/RouteIds")]
    public IActionResult ListRoutesById()
    {
        var routesById = _routesConfigProvider.ListRouteIds();

        return Ok(routesById);
    }

    [HttpGet("/Route/{id}")]
    public IActionResult GetRouteById(string id)
    {
        var routeConfig = _routesConfigProvider.GetRouteById(id);
        var routeConfigDto = _mapper.Map<RouteConfigDto>(routeConfig);

        return Ok(routeConfigDto);
    }
}
