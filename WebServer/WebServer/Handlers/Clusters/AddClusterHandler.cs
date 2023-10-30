using AutoMapper;
using MediatR;
using WebServer.Commands.Clusters;
using WebServer.ReverseProxy;
using WebServer.ReverseProxy.Config.Cluster;

namespace WebServer.Handlers.Clusters;

public class AddClusterHandler : IRequestHandler<AddClusterRequest, AddClusterResponse>
{
    private IClustersConfigProvider _clustersConfigProvider;
    private IMapper _mapper;

    public AddClusterHandler(IClustersConfigProvider clustersConfigProvider, IMapper mapper)
    {
        _clustersConfigProvider = clustersConfigProvider;
        _mapper = mapper;
    }
    
    public async Task<AddClusterResponse> Handle(AddClusterRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var clusterConfig = _mapper.Map<MutableClusterConfig>(request.ClusterConfig);

            _clustersConfigProvider.AddCluster(clusterConfig);

            return new AddClusterResponse(request.ClusterConfig);
        }
        catch (ArgumentException ex)
        {
            return new AddClusterResponse(false, ex.Message);
        }
    }
}
