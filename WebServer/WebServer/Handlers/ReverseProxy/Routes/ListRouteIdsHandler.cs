using MediatR;
using WebServer.Commands.ReverseProxy.Routes;
using WebServer.Services.ReverseProxy;

namespace WebServer.Handlers.ReverseProxy.Routes;

public class ListRouteIdsHandler : IRequestHandler<ListRouteIdsRequest, ListRouteIdsRequestResponse>
{
    private IRoutesConfigProvider _routesConfigProvider;

    public ListRouteIdsHandler(IRoutesConfigProvider routesConfigProvider)
    {
        _routesConfigProvider = routesConfigProvider;
    }
    
    public async Task<ListRouteIdsRequestResponse> Handle(ListRouteIdsRequest request, CancellationToken cancellationToken)
    {
        var routesById = _routesConfigProvider.ListRouteIds();
        return new ListRouteIdsRequestResponse(routesById);
    }
}
