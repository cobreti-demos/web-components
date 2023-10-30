using AutoMapper;
using MediatR;
using WebServer.Commands.Clusters;
using WebServer.Models.ClusterConfig;
using WebServer.ReverseProxy;

namespace WebServer.Handlers.Clusters;

public class ListClustersHandler : IRequestHandler<ListClustersRequest, ListClustersResponse>
{
    private IClustersConfigProvider _clustersConfigProvider;
    private IMapper _mapper;

    public ListClustersHandler(IClustersConfigProvider clustersConfigProvider, IMapper mapper)
    {
        _clustersConfigProvider = clustersConfigProvider;
        _mapper = mapper;
    }
    
    public async Task<ListClustersResponse> Handle(ListClustersRequest request, CancellationToken cancellationToken)
    {
        var clusters = _clustersConfigProvider.ListClusters();

        var clustersDto = clusters.Select(x => _mapper.Map<ClusterConfigDto>(x));

        return new ListClustersResponse(clustersDto);
    }
}
