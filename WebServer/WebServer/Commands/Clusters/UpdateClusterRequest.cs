using MediatR;
using WebServer.Commands.Responses;
using WebServer.Models.ClusterConfig;

namespace WebServer.Commands.Clusters;


public class UpdateClusterResponse : RequestResponse<ClusterConfigDto>
{
    public UpdateClusterResponse(ClusterConfigDto value) : base(value)
    {
    }

    public UpdateClusterResponse(bool success, string error) : base(success, error)
    {
    }
}


public class UpdateClusterRequest : IRequest<UpdateClusterResponse>
{
    public ClusterConfigDto ClusterConfig { get; }

    public UpdateClusterRequest(ClusterConfigDto clusterConfig)
    {
        ClusterConfig = clusterConfig;
    }
}
