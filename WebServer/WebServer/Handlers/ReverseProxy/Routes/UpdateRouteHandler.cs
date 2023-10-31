using AutoMapper;
using MediatR;
using WebServer.Commands.Responses;
using WebServer.Commands.ReverseProxy.Routes;
using WebServer.Services.ReverseProxy;
using WebServer.Services.ReverseProxy.Config.Route;

namespace WebServer.Handlers.ReverseProxy.Routes;

public class UpdateRouteHandler : IRequestHandler<UpdateRouteRequest, RequestResponse>
{
    private IRoutesConfigProvider _routesConfigProvider;
    private IMapper _mapper;
    
    public UpdateRouteHandler(
        IRoutesConfigProvider routesConfigProvider,
        IMapper mapper )
    {
        _routesConfigProvider = routesConfigProvider;
        _mapper = mapper;
    }
    
    public async Task<RequestResponse> Handle(UpdateRouteRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var mutableRouteConfig = _mapper.Map<MutableRouteConfig>(request.RouteConfig);

            _routesConfigProvider.Update(mutableRouteConfig);

            return new RequestResponse();
        }
        catch (ArgumentException ex)
        {
            return new RequestResponse(false, ex.Message);
        }
    }
}
