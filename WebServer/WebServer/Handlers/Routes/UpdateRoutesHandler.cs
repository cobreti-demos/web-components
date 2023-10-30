using MediatR;
using WebServer.Commands.Routes;
using WebServer.ReverseProxy;

namespace WebServer.Handlers.Routes;

public class UpdateRoutesHandler : IRequestHandler<UpdateRoutesRequest>
{
    private IRoutesConfigProvider _routesConfigProvider;
    
    public UpdateRoutesHandler(IRoutesConfigProvider routesConfigProvider)
    {
        _routesConfigProvider = routesConfigProvider;
    }
    
    public async Task Handle(UpdateRoutesRequest request, CancellationToken cancellationToken)
    {
        _routesConfigProvider.Update();
    }
}
