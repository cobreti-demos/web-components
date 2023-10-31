using MediatR;
using WebServer.Commands.Responses;
using WebServer.Commands.ReverseProxy.Routes;
using WebServer.Services.ReverseProxy;

namespace WebServer.Handlers.ReverseProxy.Routes;

public class DeleteRouteHandler : IRequestHandler<DeleteRouteRequest, RequestResponse>
{
    private IRoutesConfigProvider _routesConfigProvider;

    public DeleteRouteHandler(IRoutesConfigProvider routesConfigProvider)
    {
        _routesConfigProvider = routesConfigProvider;
    }
    
    public async Task<RequestResponse> Handle(DeleteRouteRequest request, CancellationToken cancellationToken)
    {
        try
        {
            _routesConfigProvider.Remove(request.Id);

            return new RequestResponse();
        }
        catch (ArgumentException ex)
        {
            return new RequestResponse(false, ex.Message);
        }
    }
}

