using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace Crawl.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(string url)
        {
            ViewBag.url = url;
            return View();
        }

        public string Crawl(String url)
        {
            WebClient webclient = new WebClient { Encoding = Encoding.UTF8 };
            var result = webclient.DownloadString(url);
            HtmlDocument doc = new HtmlDocument();
            doc.LoadHtml(result);
            //Regex rRemScript = new Regex(@"<script[^>]*>[\s\S]*?</script>");
            //var output = rRemScript.Replace(result, "");
            HtmlNode nodes = doc.DocumentNode.QuerySelector("script");
            foreach (var node in nodes)
            {
                node.Remove();
            }

            //List<HtmlNode> nodes = new List<HtmlNode>(doc.DocumentNode.Descendants("script"));
            //int childNodeCount = nodes[0].ChildNodes.Count;
            //for (int i = 0; i < childNodeCount; i++)
            //    nodes[0].ChildNodes.Remove(0);

            var body = doc.DocumentNode.QuerySelector("body");
            var jqueryNode = doc.CreateTextNode("<script type='text/javascript' src='/Scripts/jquery-3.3.1.min.js'></script><br/>");
            body.AppendChild(jqueryNode);
            var bootstrap = doc.CreateTextNode("<script type='text/javascript' src='/Content/bootsrap4/js/bootstrap.min.js'></script><br/>");
            body.AppendChild(bootstrap);
            var css = doc.CreateTextNode("<link rel='stylesheet' type='text/css' href='/Content/style.css'><br/>");
            body.AppendChild(css);
            var textnode = doc.CreateTextNode("<script type='text/javascript' src='/Scripts/inIframe.js'></script><br/>");
            body.AppendChild(textnode);
            return doc.DocumentNode.InnerHtml;
        }
    }
}