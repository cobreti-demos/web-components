using MediatR;
using WebServer.Commands.Responses;

namespace WebServer.Commands.Clusters;

public class ListClusterIdsResponse : RequestResponse<IReadOnlyList<string>>
{
    public IReadOnlyList<string> Ids { get; }

    public ListClusterIdsResponse(IReadOnlyList<string> value) : base(value)
    {
    }

    public ListClusterIdsResponse(bool success, string error) : base(success, error)
    {
    }
}


public class ListClusterIdsRequest : IRequest<ListClusterIdsResponse>
{
}
