
Ext.define('NotesApp.view.Login', {
    extend: 'Ext.Container',
    alias: "widget.loginview",
    
    requires: "Ext.Img",
    
    config: {
        style: 'background:white',
        layout: {
            type: 'vbox'
        },
        items: [
            {
                xtype: 'panel',
                flex: 3,
                items: [
                    {
                        xtype: 'image',
                        centered: true,
                        height: 312,
                        ui: '',
                        width: 321,
                        src: 'resources/images/login_icon320x320.png'
                    }
                ]
            },
            {
                xtype: 'spacer',
                flex: 1
            },
            {
                xtype: 'panel',
                maxHeight: '',
                maxWidth: '',
                minHeight: '',
                flex: 1,
                items: [
                    {
                        xtype: 'button',
                        centered: true,
                        itemId: "loginButton",
                        ui: 'action',
                        text: '与百度连接'
                    }
                ]
            },
            {
                xtype: 'spacer'
            }
        ],
        listeners: [
            {
                delegate: "#loginButton",
                event: "tap",
                fn: "onloginButtonTap"
            }
        ]
                          
    },
    
   onloginButtonTap: function () {
        console.log("loginNoteCommand");
        this.fireEvent("loginNoteCommand", this);
    }

});