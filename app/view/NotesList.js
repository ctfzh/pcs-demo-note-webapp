Ext.define("NotesApp.view.NotesList", {
    extend: "Ext.Container",
    requires:"Ext.dataview.List",
    alias: "widget.noteslistview",

    config: {
        layout: {
            type: 'fit'
        },
        items: [{
                
            xtype: 'toolbar',
            docked: 'top',
            title: '云端记事本',

            items: [
				{   
					xtype: "button",
                    text: '刷新',
                    ui: 'action',
                    itemId: "refreshButton"
				},
                { xtype: 'spacer' },
                {
                    xtype: "button",
                    text: '创建',
                    ui: 'action',
                    itemId: "newButton"
                }
            ]
        }, {
            xtype: "list",
            store: "Notes",
            itemId:"notesList",
            loadingText: "Loading Notes...",
            emptyText: "<div class=\"notes-list-empty-text\">No notes found.</div>",
            onItemDisclosure: true,
            grouped: true,
            itemTpl: "<div class=\"list-item-title\">{title}</div><div class=\"list-item-narrative\">{narrative}</div>"       
        }],
        listeners: [
		{
            delegate: "#refreshButton",
            event: "tap",
            fn: "onRefreshButtonTap"
        }, {
            delegate: "#newButton",
            event: "tap",
            fn: "onNewButtonTap"
        }, {
            delegate: "#notesList",
            event: "disclose",
            fn: "onNotesListDisclose"
        }]
    }, 

    onRefreshButtonTap: function () {
        console.log("refreshNoteCommand");
        this.fireEvent("refreshNoteCommand", this);
    },
	
    onNewButtonTap: function () {
        console.log("newNoteCommand");
        this.fireEvent("newNoteCommand", this);
    },
    onNotesListDisclose: function (list, record, target, index, evt, options) {
        console.log("editNoteCommand");
        this.fireEvent('editNoteCommand', this, record);
    }
});