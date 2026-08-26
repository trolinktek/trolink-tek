(function(){
  var app=document.getElementById('about-app');
  var exhibitions=[
    ['Connected-car showcase','/assets/exhibitions/trolinktek-exhibition-team-booth.jpg?v=20260821-1','TrolinkTek exhibition team at a connected-car product booth','Our team presents wireless CarPlay adapters, AI boxes and display platforms to visiting buyers and channel partners.'],
    ['Live product demonstration','/assets/exhibitions/trolinktek-exhibition-product-demo.jpg?v=20260821-1','TrolinkTek team demonstrating an electronics platform to exhibition visitors','Face-to-face demonstrations help buyers review platform functions, hardware options and potential application routes.'],
    ['International partner meeting','/assets/exhibitions/trolinktek-exhibition-partner-meeting.jpg?v=20260821-1','TrolinkTek representative meeting an international buyer at a trade show','Exhibitions create a practical setting to discuss target markets, customization requirements and OEM or ODM project scope.'],
    ['Distributor engagement','/assets/exhibitions/trolinktek-exhibition-customer-engagement.jpg?v=20260821-1','TrolinkTek exhibition team with an international visitor','In-person conversations help our team understand regional demand, sales channels and after-sales expectations.'],
    ['Regional CarPlay showcase','/assets/exhibitions/trolinktek-exhibition-carplay-booth.jpg?v=20260821-1','TrolinkTek team at a regional CarPlay product exhibition booth','Product-focused exhibition displays give buyers a direct view of available platforms, form factors and connected-car applications.']
  ];
  var factoryImages=[
    ['/assets/trolinktek-real-smt-production-line.jpg','TrolinkTek SMT production floor with automated equipment and technicians'],
    ['/assets/factory/factory-smt-line-01.jpg?v=20260814-1','TrolinkTek clean SMT workshop with reflow equipment and production staff'],
    ['/assets/factory/factory-smt-line-02.jpg?v=20260814-1','TrolinkTek SMT production line with operators and quality-control workstations'],
    ['/assets/factory/factory-reflow-oven.jpg?v=20260814-1','Reflow oven operating in the TrolinkTek electronics production workshop'],
    ['/assets/factory/factory-smt-line-03.jpg?v=20260814-1','Automated SMT placement equipment across the TrolinkTek production floor'],
    ['/assets/factory/factory-placement-workshop.jpg?v=20260814-1','TrolinkTek component placement workshop with monitored production stations'],
    ['/assets/factory/factory-engineering-test.jpg?v=20260814-1','TrolinkTek engineers testing electronic assemblies at factory workbenches'],
    ['/assets/factory/factory-automation-equipment.jpg?v=20260814-1','Automated electronics production equipment at the TrolinkTek Shenzhen facility'],
    ['/assets/factory/factory-workshop-panorama-01.jpg?v=20260814-2','Panoramic view of TrolinkTek assembly, inspection and packing workstations']
  ];
  function two(value){return value<10?'0'+value:String(value)}
  app.innerHTML='<header class="header"><a class="brand" href="/"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"></a><nav><a href="/products/">Products</a><a href="/#oem">OEM/ODM</a><a href="/solutions/">Distributor</a><a href="/blog/">Blog</a><a class="active" href="/about/">About</a></nav><a class="btn small" href="/#quote">Get a Quote</a></header><main>'+
    '<section class="about-hero"><div class="about-hero-copy"><h1>Connected mobility, engineered as one complete system.</h1><p>TrolinkTek brings product development, firmware, customization, supply and support together for automotive brands and distributors worldwide.</p></div><div class="about-hero-image"><img src="/assets/trolinktek-global-partnership-team.png" alt="TrolinkTek team welcoming international business partners"></div></section>'+
    '<section class="about-belief"><blockquote>A good connected-car product is the product, firmware, supply and support working as one.</blockquote><p>That belief shapes how we develop wireless CarPlay, Android Auto and connected-drive products.</p></section>'+
    '<section class="about-certificates about-exhibitions" id="exhibitions"><div class="certificate-copy"><span>Global exhibitions</span><h2>Meeting partners across global markets.</h2><p>From live product demonstrations to distributor discussions, TrolinkTek presents connected-car platforms and supports international buyers.</p><div class="certificate-meta"><strong id="certificate-name">'+exhibitions[0][0]+'</strong><span id="certificate-count">01 / '+two(exhibitions.length)+'</span></div><div class="certificate-controls"><button class="certificate-prev" type="button" aria-label="Previous exhibition photo">&larr;</button><button class="certificate-next" type="button" aria-label="Next exhibition photo">&rarr;</button></div><a class="text-link" href="/#quote">Plan a meeting with our team &rarr;</a></div><div class="certificate-stage"><div class="certificate-frame"><img id="certificate-image" src="'+exhibitions[0][1]+'" alt="'+exhibitions[0][2]+'"></div><p id="certificate-description">'+exhibitions[0][3]+'</p></div></section>'+
    '<section class="about-capabilities"><div class="capability-media"><img id="factory-image-ie" src="'+factoryImages[0][0]+'" alt="'+factoryImages[0][1]+'"></div><div class="capability-copy"><span>Shenzhen manufacturing partner</span><h2>Proof you can inspect.</h2><p>Our Shenzhen operation connects engineering, product evaluation and global commercial support.</p></div></section></main>'+
    '<footer><div class="footer-brand"><img src="/assets/trolinktek-logo.png" alt="TrolinkTek"><p>Connected-drive products engineered for your market.</p></div><div><b>About</b><a href="#exhibitions">Exhibitions</a></div><div><b>Contact</b><a href="mailto:sales03@trolinkiot.com">sales03@trolinkiot.com</a></div></footer>';
  var index=0,image=document.getElementById('certificate-image'),name=document.getElementById('certificate-name'),count=document.getElementById('certificate-count'),description=document.getElementById('certificate-description');
  function show(next){index=(next+exhibitions.length)%exhibitions.length;image.src=exhibitions[index][1];image.alt=exhibitions[index][2];name.innerText=exhibitions[index][0];count.innerText=two(index+1)+' / '+two(exhibitions.length);description.innerText=exhibitions[index][3]}
  document.querySelector('.certificate-prev').onclick=function(){show(index-1)};
  document.querySelector('.certificate-next').onclick=function(){show(index+1)};
  var factoryIndex=0,factoryImage=document.getElementById('factory-image-ie');
  window.setInterval(function(){factoryIndex=(factoryIndex+1)%factoryImages.length;factoryImage.src=factoryImages[factoryIndex][0];factoryImage.alt=factoryImages[factoryIndex][1]},5200);
}());
