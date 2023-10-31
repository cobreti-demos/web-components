using AutoMapper;
using MediatR;
using WebServer.Commands.ReverseProxy.Routes;
using WebServer.Services.ReverseProxy;
using WebServer.Services.ReverseProxy.Config.Route;

namespace WebServer.Handlers.ReverseProxy.Routes;

public class AddRouteHandler : IRequestHandler<AddRouteRequest, AddRouteResponse>
{
    private IRoutesConfigProvider _routesConfigProvider;
    private IMapper _mapper;

    public AddRouteHandler(
        IRoutesConfigProvider routesConfigProvider,
        IMapper mapper)
    {
        _routesConfigProvider = routesConfigProvider;
        _mapper = mapper;
    }
    
    public async Task<AddRouteResponse> Handle(AddRouteRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var mutableRouteConfig = _mapper.Map<MutableRouteConfig>(request.RouteConfig);

            _routesConfigProvider.Add(mutableRouteConfig);

            return new AddRouteResponse(request.RouteConfig);
        }
        catch (ArgumentException ex)
        {
            return new AddRouteResponse(false, ex.Message);
        }
    }
}