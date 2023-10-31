using MediatR;
using WebServer.Commands.Responses;
using WebServer.Models.ClusterConfig;

namespace WebServer.Commands.ReverseProxy.Clusters;

public class GetClusterByIdResponse : RequestResponse<ClusterConfigDto>
{
    public GetClusterByIdResponse(ClusterConfigDto value) : base(value)
    {
    }

    public GetClusterByIdResponse(bool success, string error) : base(success, error)
    {
    }
}

public class GetClusterByIdRequest : IRequest<GetClusterByIdResponse>
{
    public string Id { get; }

    public GetClusterByIdRequest(string id)
    {
        Id = id;
    }
}

