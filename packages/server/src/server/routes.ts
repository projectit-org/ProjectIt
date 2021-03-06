import * as Router from "koa-router";

import { ModelRequests } from "./ModelRequests";

const router = new Router();

router.get("/", async (ctx: Router.IRouterContext) => {
    ctx.body = "ProjectIt Model Server";
});

router.get("/getModelUnit", async (ctx: Router.IRouterContext) => {
    const folder = ctx.query["folder"];
    const name = ctx.query["name"];
    console.log("GetModelUnit: " + folder + "/" + name);
    if ((!!name || folder) && (typeof name === "string" && typeof folder === "string")) {
        ModelRequests.getModelUnit(folder, name, ctx);
        ctx.status = 201;
    } else {
        ctx.status = 412; // Precondition failed
        ctx.message = "Missing query parameter 'unitName' or 'folder'";
    }
});

router.get("/getModelList", async (ctx: Router.IRouterContext) => {
    console.log("getModelList");
    ModelRequests.getModelList(ctx);
    ctx.status = 201;
});

router.get("/getUnitList", async (ctx: Router.IRouterContext) => {
    const folder = ctx.query["folder"];
    // const subfolder = ctx.query["subfolder"];
    console.log("getUnitList: " + folder) ;
    if (!!folder && typeof folder === "string") {
        ModelRequests.getUnitList(folder, ctx);
        ctx.status = 201;
    } else {
        ctx.status = 412; // Precondition failed
        ctx.message = "Missing query parameter 'folder'";
    }
});
router.put("/putModelUnit", async (ctx: Router.IRouterContext) => {
    const folder = ctx.query["folder"];
    const name = ctx.query["name"];
    console.log("PutModel: " + folder + "/" + name);
    if ((!!name || !!folder) && (typeof name === "string" && typeof folder === "string")) {
        ModelRequests.putModelUnit(folder, name, ctx);
        ctx.status = 201;
    } else {
        ctx.status = 412; // Precondition failed
        ctx.message = "Missing query parameter 'unitName' or 'folder'";
    }
    ctx.body = { massage: (ctx.request as any).body };
});

router.get("/deleteModelUnit", async (ctx: Router.IRouterContext) => {
    const folder = ctx.query["folder"];
    const name = ctx.query["name"];
    console.log("DeleteModel: " + folder + "/" + name);
    if ((!!name || folder) && (typeof name === "string" && typeof folder === "string")) {
        ModelRequests.deleteModelUnit(folder, name, ctx);
        ctx.status = 201;
    } else {
        ctx.status = 412; // Precondition failed
        ctx.message = "Missing query parameter 'unitName' or 'folder'";
    }
    ctx.body = { massage: (ctx.request as any).body };
});

export const routes = router.routes();
