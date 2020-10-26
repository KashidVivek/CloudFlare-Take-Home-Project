const Router = require('./router')
const linksJSON = [{"name": "Rekemendo", "url": "https://rekemendo.me"},
                       {"name": "Facebook", "url": "https://facebook.com"},
                       {"name": "Twitter", "url": "https://twitter.com"},
                       {"name": "Google", "url": "https://google.com"},
                       {"name": "Instagram", "url": "https://instagram.com"}]

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

function handler(request) {
    const init = {
        headers: { 'content-type': 'application/json' },
    }
    
    const body = JSON.stringify(linksJSON)
    return new Response(body, init)
}

async function htmlHandler(request){
    const res = await fetch("https://static-links-page.signalnerve.workers.dev")
    const LinkTransformer = {
    element: (element) => {
      linksJSON.forEach(link=>{
        element.append(`<a href="${link.url}">${link.name}</a>`, { html: true })
      })
      },
    }
    const profileTransformer = {
        element: (element) => { 
            element.removeAttribute('style');
            element.get
        },
    }
    const usernameTransformer = {
        element: (element) => { 
            element.setInnerContent('Vivek Kashid')
        },
    }

    const imgAvatarTransformer = {
        element: (element) => { 
            element.setAttribute("src", "http://www.vivekkashid.me/img/about.jpg")
        },
    }

    const titleTransformer = {
        element: (element) => { 
            element.setInnerContent('Vivek Kashid')        
        },
    }

    const socialTransformer = {
        element: (element) => { 
            element.removeAttribute('style');
            element.append("<a href=\"https://www.vivekkashid.me\"><img src=\"https://www.flaticon.com/svg/static/icons/svg/1946/1946547.svg\"></a>", { html: true })
            element.append("<a href=\"https://linkedin.com/in/vivek-kashid\"><img src=\"https://www.flaticon.com/svg/static/icons/svg/61/61109.svg\"></a>", { html: true })
            element.append("<a href=\"https://github.com/KashidVivek\"><img src=\"https://www.flaticon.com/svg/static/icons/svg/37/37318.svg\"></a>", { html: true })
            element.append("<a href=\"https://rekemendo.me\"><img src=\"https://www.flaticon.com/premium-icon/icons/svg/3536/3536778.svg\"></a>", { html: true })
        },
    }

    const backgroundTransformer = {
        element: (element) => { 
            element.setAttribute("class", "bg-primary");
        },
    }

    const rewriter = new HTMLRewriter()
        .on('div#links', LinkTransformer)
        .on("div#profile", profileTransformer)
        .on("img#avatar", imgAvatarTransformer)
        .on("h1#name", usernameTransformer)
        .on("title", titleTransformer)
        .on("div#social", socialTransformer)
        .on("body", backgroundTransformer)
    return rewriter.transform(res)
}

async function handleRequest(request) {
    const r = new Router()
    const static_page = fetch("https://static-links-page.signalnerve.workers.dev")
    r.get('/links', request => handler(request))
    r.get('.*/*', request => htmlHandler(request))
    const resp = await r.route(request)
    return resp
}

