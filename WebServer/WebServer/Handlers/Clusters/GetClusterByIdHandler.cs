using AutoMapper;
using MediatR;
using WebServer.Commands.Clusters;
using WebServer.Models.ClusterConfig;
using WebServer.ReverseProxy;

namespace WebServer.Handlers.Clusters;

public class GetClusterByIdHandler : IRequestHandler<GetClusterByIdRequest, GetClusterByIdResponse>
{
    private IClustersConfigProvider _clustersConfigProvider;
    private IMapper _mapper;

    public GetClusterByIdHandler(IClustersConfigProvider clustersConfigProvider, IMapper mapper)
    {
        _clustersConfigProvider = clustersConfigProvider;
        _mapper = mapper;
    }
    
    public async Task<GetClusterByIdResponse> Handle(GetClusterByIdRequest request, CancellationToken cancellationToken)
    {
        var clusterConfig = _clustersConfigProvider.GetClusterById(request.Id);
        var clusterConfigDto = _mapper.Map<ClusterConfigDto>(clusterConfig);

        return new GetClusterByIdResponse(clusterConfigDto);
    }
}

