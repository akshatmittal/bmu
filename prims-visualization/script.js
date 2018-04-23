
var myviz = new Vamonos.Visualizer({
    widgets: [
        new Vamonos.Widget.Controls("controls"),

        new Vamonos.Widget.Console(),

        new Vamonos.Widget.Pseudocode({
            container: "pseudocode",
        }),

        new Vamonos.Widget.VarName({
            container: "q-var",
            varName: "Q",
        }),

        new Vamonos.Widget.Queue({
            container: "queue",
            varName: "Q",
            showLabel: false,
            displayOnly: true,
            cellFormat: function (v) {
                if (v) {
                    var key = (v.key == Infinity ? "\u221E" : v.key);
                    return v.name + " : " + key;
                }
                else return "";
            }
        }),

        new Vamonos.Widget.VarName({
            container: "g-var",
            varName: "G",
            inputVar: true,
            watching: true,
        }),

        new Vamonos.Widget.Graph({
            container: "graph",
            varName: "G",
            inputVars: { r: "v1" },
            vertexLabels: {
                inner: {
                    edit: function(vtx){ return vtx.name },
                    display: function(vtx){ return vtx.key },
                },
                ne: ['u','v'],
                nw: ['r'],
            },
            edgeLabel: "w",
            defaultEdgeAttrs: { w: 1 },
            edgeCssAttributes: {
                red  : "u->v",
                blue : function(edge){
                    return (edge.target.pred === edge.source.name)
                        || (edge.source.pred === edge.target.name) }
            },
            defaultGraph: new Vamonos.DataStructure.Graph({
                directed: false,
                prefix: "",
                vertices: [
                    { id: 'v0', x: 10, y: 187 },
                    { id: 'v1', x: 4, y: 13 },
                    { x: 87, y: 156, id: 'v4' },
                    { x: 94, y: 87, id: 'v5' },
                    { x: 207, y: 195, id: 'v6' },
                    { x: 160, y: 124, id: 'v7' },
                    { x: 223, y: 26, id: 'v8' },
                    { x: 151, y: 53, id: 'v9' },
                    { x: 104, y: 0, id: 'v10' },
                ],
                edges: [
                    { source: 'v1', target: 'v0', w: 6 },
                    { source: 'v0', target: 'v6', w: 9 },
                    { source: 'v0', target: 'v4', w: 3 },
                    { source: 'v1', target: 'v0', w: 6 },
                    { source: 'v4', target: 'v1', w: 4 },
                    { source: 'v5', target: 'v1', w: 2 },
                    { source: 'v9', target: 'v1', w: 5 },
                    { source: 'v10', target: 'v1', w: 4 },
                    { source: 'v0', target: 'v6', w: 9 },
                    { source: 'v7', target: 'v6', w: 8 },
                    { source: 'v6', target: 'v4', w: 9 },
                    { source: 'v6', target: 'v8', w: 18 },
                    { source: 'v0', target: 'v4', w: 3 },
                    { source: 'v4', target: 'v1', w: 4 },
                    { source: 'v4', target: 'v5', w: 2 },
                    { source: 'v6', target: 'v4', w: 9 },
                    { source: 'v4', target: 'v5', w: 2 },
                    { source: 'v5', target: 'v1', w: 2 },
                    { source: 'v5', target: 'v7', w: 8 },
                    { source: 'v5', target: 'v7', w: 8 },
                    { source: 'v7', target: 'v6', w: 8 },
                    { source: 'v8', target: 'v7', w: 10 },
                    { source: 'v7', target: 'v9', w: 9 },
                    { source: 'v6', target: 'v8', w: 18 },
                    { source: 'v8', target: 'v7', w: 10 },
                    { source: 'v8', target: 'v9', w: 3 },
                    { source: 'v8', target: 'v10', w: 4 },
                    { source: 'v7', target: 'v9', w: 9 },
                    { source: 'v8', target: 'v9', w: 3 },
                    { source: 'v9', target: 'v1', w: 5 },
                    { source: 'v8', target: 'v10', w: 4 },
                    { source: 'v10', target: 'v1', w: 4 },
                ]
            }),
        })
    ],

    algorithm: function(_){
        with (this) {
            G.eachVertex(function(vtx){
_(1);           u = vtx;
_(2);           u.key = Infinity;
_(3);           u.pred = undefined;
            });
_(4);       r.key = 0;
_(5);       Q = new Vamonos.DataStructure.Queue({
                initialArray: G.getVertices(),
                comparator: function(a,b){
                    return (a.key == b.key ? 0 :
                            a.key  > b.key ? 1 : -1)
                },
            });
_(6);       while (_(6), !Q.isEmpty()) {
_(7);           u = Q.extractMin();
                G.eachNeighbor(u, function(vtx){
_(8);               v = vtx;
_(9);               if (Q.contains(v) && G.edge(u,v).w < v.key) {
_(10);                  v.pred = u.name;
_(11);                  v.key = G.edge(u,v).w;
                        Q.sort();
                    }
                })

            }
        }
    },
});