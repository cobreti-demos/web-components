using MediatR;
using WebServer.Commands.Responses;

namespace WebServer.Commands.Routes;

public class DeleteRouteRequest : IRequest<RequestResponse>
{
    public string Id { get; }

    public DeleteRouteRequest(string id)
    {
        Id = id;
    }
}
