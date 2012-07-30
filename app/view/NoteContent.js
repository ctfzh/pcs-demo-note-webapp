/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('WebNoteDemo.view.NoteContent', {
    extend: 'Ext.Container',
    xtype: 'notecontent',
    
    requires: [
        'WebNoteDemo.view.NoteEditor',
        'WebNoteDemo.store.NoteStore'
    ],

    config: {
        layout : 'fit',
        
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'note',
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        ui: 'action',
                        text: 'new',
                        
                        handler: function () {
                            
                            editor = Ext.create('WebNoteDemo.view.NoteEditor');
                            
                            var now = new Date();
                            var noteId = now.getTime();
//                            var note = Ext.ModelMgr.create({ id: noteId, date: now, title:'', narrative:'' },
//                                                           'NoteDataModel' );
//                            editor.load(note);
                            
                            Ext.Viewport.setActiveItem(editor,{type:'slide',direction:'left'});
                        }
                        
                    }
                ]
            },
            {
                xtype: 'list',

                store: 'NoteStore',
                
                emptyText: '<div style="margin:5px;">No notes cached.</div>',
                
                itemTpl: ['<div class="list-item-title">{title}</div>' ,
                          '<div class="list-item-narrative">{narrative}</div>'
                         ],

                listeners: {
                    'render': function (thisComponent) {
                        thisComponent.getStore().load();
                      }
                },
                
                onItemDisclosure: function (record) { 
                    editor = Ext.create('WebNoteDemo.view.NoteEditor');
                    editor.load(record);

                    Ext.Viewport.setActiveItem(editor, { type: 'slide', direction: 'left' });
                }
            }
        ]
    }

});



