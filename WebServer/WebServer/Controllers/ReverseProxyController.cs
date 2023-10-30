using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebServer.Commands;
using WebServer.Commands.Responses;
using WebServer.Commands.Routes;
using WebServer.Models.ClusterConfig;
using WebServer.Models.RouteConfig;
using WebServer.ReverseProxy;
using WebServer.ReverseProxy.Config.Route;

namespace WebServer.Controllers;

[Route("[controller]")]
public class ReverseProxyController : Controller
{
    private IMapper _mapper;
    private IRoutesConfigProvider _routesConfigProvider;
    private IClustersConfigProvider _clustersConfigProvider;
    private IMediator _mediator;

    public ReverseProxyController(
        IMapper mapper,
        IRoutesConfigProvider routesConfigProvider,
        IClustersConfigProvider clustersConfigProvider,
        IMediator mediator)
    {
        _mapper = mapper;
        _routesConfigProvider = routesConfigProvider;
        _clustersConfigProvider = clustersConfigProvider;
        _mediator = mediator;
    }

    [HttpGet("Routes/Ids")]
    public async Task<IActionResult> ListRouteIds()
    {
        var response = await _mediator.Send<ListRouteIdsRequestResponse>(new ListRouteIdsRequest());
        return Ok(response.Value);
    }

    [HttpGet("Routes")]
    public async Task<IActionResult> ListRoutes()
    {
        var response = await _mediator.Send<ListRoutesRequestResponse>(new ListRoutesRequest());

        return Ok(response.Value);
    }

    [HttpGet("Route/{id}")]
    public async Task<IActionResult> GetRouteById(string id)
    {
        var response = await _mediator.Send<GetRouteByIdResponse>(new GetRouteByIdRequest(id));

        return Ok(response.Value);
    }

    [HttpPost("Route")]
    public async Task<IActionResult> AddRoute([FromBody] RouteConfigDto routeConfigDto)
    {
        var response = await _mediator.Send<AddRouteResponse>(new AddRouteRequest(routeConfigDto));

        if (!response.Succeeded)
        {
            return BadRequest(response.Error);
        }

        return Ok(response.Value);
    }

    [HttpPut("Route")]
    public async Task<IActionResult> UpdateRoute([FromBody] RouteConfigDto routeConfigDto)
    {
        var result = await _mediator.Send<RequestResponse>(new UpdateRouteRequest(routeConfigDto));

        if (!result.Succeeded)
        {
            return BadRequest(result.Error);
        }
        
        return Ok(routeConfigDto);
    }

    [HttpDelete("Route/{id}")]
    public async Task<IActionResult> DeleteRoute(string id)
    {
        var response = await _mediator.Send<RequestResponse>(new DeleteRouteRequest(id));

        if (!response.Succeeded)
        {
            return BadRequest(response.Error);
        }

        return Ok();
    }
    
    [HttpGet("Clusters/Ids")]
    public IActionResult ListClusterIds()
    {
        var clusterIds = _clustersConfigProvider.ListClusterIds();
        return Ok(clusterIds);
    }

    [HttpGet("Clusters")]
    public IActionResult ListClusters()
    {
        var clusters = _clustersConfigProvider.ListClusters();
        var clustersDto = clusters.Select(x => _mapper.Map<ClusterConfigDto>(x));

        return Ok(clustersDto);
    }
    
    [HttpGet("cluster/{id}")]
    public IActionResult GetClusterById(string id)
    {
        var clusterConfig = _clustersConfigProvider.GetClusterById(id);
        var clusterConfigDto = _mapper.Map<ClusterConfigDto>(clusterConfig);
        return Ok(clusterConfigDto);
    }

    [HttpPost("routes/update")]
    public async Task<IActionResult> UpdateRoutes()
    {
        // _routesConfigProvider.Update();
        await _mediator.Send(new UpdateRoutesRequest());
        
        return Ok();
    }
    
    [HttpPost("clusters/update")]
    public IActionResult UpdateClusters()
    {
        _clustersConfigProvider.Update();
        
        return Ok();
    }
}
