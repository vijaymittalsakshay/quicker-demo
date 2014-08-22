(function(global){
    var app = global.app = global.app ||{};
    
    apps = new kendo.mobile.Application(document.body,
    												{
                                                        layout:'my-layout',
                                                        skin:'flat',
                                                        transition:'fade'
                                                    }
    									);
    
    var el = new Everlive(
    						{
                                 apiKey: 'mPSABd4lT1mXOCxY', // set your API Key here
       						  scheme: 'http'
                            }
    					);
})(window);