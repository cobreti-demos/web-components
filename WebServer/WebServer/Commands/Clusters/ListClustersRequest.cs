using MediatR;
using WebServer.Commands.Responses;
using WebServer.Models.ClusterConfig;

namespace WebServer.Commands.Clusters;

public class ListClustersResponse : RequestResponse<IEnumerable<ClusterConfigDto>>
{
    public ListClustersResponse(IEnumerable<ClusterConfigDto> value) : base(value)
    {
    }

    public ListClustersResponse(bool success, string error) : base(success, error)
    {
    }
}


public class ListClustersRequest : IRequest<ListClustersResponse>
{
}