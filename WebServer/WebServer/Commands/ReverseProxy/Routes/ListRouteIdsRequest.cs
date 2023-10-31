using MediatR;
using WebServer.Commands.Responses;

namespace WebServer.Commands.ReverseProxy.Routes;

public class ListRouteIdsRequestResponse : RequestResponse<IReadOnlyList<string>>
{
    public ListRouteIdsRequestResponse(IReadOnlyList<string> value) : base(value)
    {
    }
}

public class ListRouteIdsRequest : IRequest<ListRouteIdsRequestResponse>
{
    
}