/* ************************************************************************

License: MIT

Authors: Lukas Michalski, Benjamin Zeller, Thorsten Schwalb

************************************************************************ */

qx.Class.define("pms.HtmlWidget",
{
extend : qx.ui.embed.Html,

construct: function (channelname)
{
  this.base(arguments);
  this.setWidgetLayout(); 
  
  this.__channelname = channelname;
  this.__init = 0 ;
  this.__initData = [];
  
  this.main();
},

/******************************************************************************
* MEMBERS
******************************************************************************/  
members :
{
  '__channelname' : null,
  '__init'        : null,
  '__initData'    : null,
  
/******************************************************************************
* FUNCTION: main
******************************************************************************/
  main : function ()
  {   
     this.setHtml("<div id=pms-"+this.__channelname+"></div>"); 
  },
  setWidgetLayout : function ()
  {
    this.setOverflow("auto","auto");
    this.setDecorator("main");
    this.setBackgroundColor("white"); 
  },
  addMessage : function (value,container)
  {
    if(this.__init == 0)
    { 
      this.__initData.push(value);
      
      var data = "<div id=pms-"+container+">";
      
      for(var x=0; x < this.__initData.length; x++)
      {
        data += "<pre class='pms-css'>"+this.__initData[x]+"</pre>";
      }
      
      data += "</div>";
      
      this.setHtml(data);
      
      if(value.match(/END BACKLOG/))
        this.setInit();
    }
    else
    {
      this.debug("jo");
      qx.bom.Collection.create("<pre class='pms-css'>"+value+"</pre>").appendTo("#pms-"+container);
    }
  },
  setInit : function ()
  {
    this.__init = 1;
  }
}
});

/*
 qx.bom.Collection.query("#div1").append(
  document.createElement("br"),
  qx.bom.Collection.query("#div2"),
  "<em>after div2</em>"
);
 
 */