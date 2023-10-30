using AutoMapper;
using MediatR;
using WebServer.Commands;
using WebServer.Models.RouteConfig;
using WebServer.ReverseProxy;

namespace WebServer.Handlers;

public class ListRoutesHandler : IRequestHandler<ListRoutesRequest, ListRoutesRequestResponse>
{
    private IRoutesConfigProvider _routesConfigProvider;
    private IMapper _mapper;

    public ListRoutesHandler(
        IRoutesConfigProvider routesConfigProvider,
        IMapper mapper )
    {
        _routesConfigProvider = routesConfigProvider;
        _mapper = mapper;
    }

    
    public async Task<ListRoutesRequestResponse> Handle(ListRoutesRequest request, CancellationToken cancellationToken)
    {
        var routes = _routesConfigProvider.ListRoutes();
        var routesDto = routes.Select(x => _mapper.Map<RouteConfigDto>(x));

        return new ListRoutesRequestResponse(routesDto);
    }
}
