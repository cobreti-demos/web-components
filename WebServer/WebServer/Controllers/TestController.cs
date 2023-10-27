using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Logging;

namespace WebServer.Controllers
{
    [Route("[controller]")]
    public class TestController : Controller
    {
        private readonly ILogger<TestController> _logger;

        public TestController(ILogger<TestController> logger)
        {
            _logger = logger;
        }

        // public IActionResult Index()
        // {
        //     return View();
        // }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View("Error!");
        }


        [HttpGet("file/{**url}")]
        public IActionResult Index(string url)
        {
            var basePath = "/Users/dannythibaudeau/dev/cobreti-demos/web-components/Components/Angular/Web-Components/dist/web-component";
            var filePath = basePath;

            Regex angularRegex = new Regex(@"^angular/(.*)");
            var match = angularRegex.Match(url);
            if (match.Success)
            {
                filePath = Path.Combine(filePath, match.Groups[1].Value);
            }

            if (!Path.Exists(filePath))
            {
                return NotFound();
            }

            if (url.EndsWith(".ico")) {
                var image = System.IO.File.OpenRead(filePath);
                return File(image, "image/x-icon");
            }
            
            var fileContent = System.IO.File.OpenRead(filePath);
            return File(fileContent, "text/javascript");
        }

        // [HttpGet("url/{**url}")]
        // public async Task<IActionResult> FromUrl(string url)
        // {
        //     var baseUrl = "http://localhost:8003/";

        //     Regex angularRegex = new Regex(@"^angular/(.*)");
        //     var match = angularRegex.Match(url);
        //     if (match.Success)
        //     {
        //         baseUrl = Path.Combine(baseUrl, match.Groups[1].Value);
        //     }

        //     // var client = new HttpClient();
        //     // using HttpResponseMessage responseMessage = await client.GetAsync(baseUrl);

        //     // return Ok(responseMessage);
        //     return RedirectPreserveMethod(baseUrl);
        // }
    }
}