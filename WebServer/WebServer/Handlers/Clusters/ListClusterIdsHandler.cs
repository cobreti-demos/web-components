using MediatR;
using WebServer.Commands.Clusters;
using WebServer.ReverseProxy;

namespace WebServer.Handlers.Clusters;

public class ListClusterIdsHandler : IRequestHandler<ListClusterIdsRequest, ListClusterIdsResponse>
{
    private IClustersConfigProvider _clustersConfigProvider;

    public ListClusterIdsHandler(IClustersConfigProvider clustersConfigProvider)
    {
        _clustersConfigProvider = clustersConfigProvider;
    }
    
    public async Task<ListClusterIdsResponse> Handle(ListClusterIdsRequest request, CancellationToken cancellationToken)
    {
        var clusterIds = _clustersConfigProvider.ListClusterIds();

        return new ListClusterIdsResponse(clusterIds);
    }
}
