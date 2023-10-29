using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebServer.Models.ClusterConfig;
using WebServer.Models.RouteConfig;
using WebServer.ReverseProxy;

namespace WebServer.Controllers;

[Route("[controller]")]
public class ReverseProxyController : Controller
{
    private IMapper _mapper;
    private IRoutesConfigProvider _routesConfigProvider;
    private IClustersConfigProvider _clustersConfigProvider;
    
    public ReverseProxyController( 
        IMapper mapper, 
        IRoutesConfigProvider routesConfigProvider,
        IClustersConfigProvider clustersConfigProvider )
    {
        _mapper = mapper;
        _routesConfigProvider = routesConfigProvider;
        _clustersConfigProvider = clustersConfigProvider;
    }
    
    [HttpGet("Routes/Ids")]
    public IActionResult ListRouteIds()
    {
        var routesById = _routesConfigProvider.ListRouteIds();

        return Ok(routesById);
    }

    [HttpGet("Route/{id}")]
    public IActionResult GetRouteById(string id)
    {
        var routeConfig = _routesConfigProvider.GetRouteById(id);
        var routeConfigDto = _mapper.Map<RouteConfigDto>(routeConfig);

        return Ok(routeConfigDto);
    }

    [HttpGet("Clusters/Ids")]
    public IActionResult ListClusterIds()
    {
        var clusterIds = _clustersConfigProvider.ListClusterIds();
        return Ok(clusterIds);
    }

    [HttpGet("cluster/{id}")]
    public IActionResult GetClusterById(string id)
    {
        var clusterConfig = _clustersConfigProvider.GetClusterById(id);
        var clusterConfigDto = _mapper.Map<ClusterConfigDto>(clusterConfig);
        return Ok(clusterConfigDto);
    }
}
