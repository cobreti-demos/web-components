using MediatR;
using WebServer.Commands.Responses;
using WebServer.Models.ClusterConfig;

namespace WebServer.Commands.ReverseProxy.Clusters;


public class AddClusterResponse : RequestResponse<ClusterConfigDto>
{
    public AddClusterResponse(ClusterConfigDto value) : base(value)
    {
    }

    public AddClusterResponse(bool success, string error) : base(success, error)
    {
    }
}


public class AddClusterRequest : IRequest<AddClusterResponse>
{
    public ClusterConfigDto ClusterConfig { get; }

    public AddClusterRequest(ClusterConfigDto clusterConfig)
    {
        ClusterConfig = clusterConfig;
    }
}
