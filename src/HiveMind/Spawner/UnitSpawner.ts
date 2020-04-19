export function bodyCost(body: BodyPartConstant[]) {
    return body.reduce((cost: number, part: BodyPartConstant) => {
        return cost + BODYPART_COST[part];
    }, 0);
}

export function generateUnit(energy: number, body: UnitTemplate): {
    cost: number,
    body: BodyPartConstant[],
} {
    let ccost = bodyCost(body.minBody);
    let cbody = body.minBody;
    if (ccost < energy) {
        for (let i = 0; i < body.max; i++) {
            let vbody = Object.assign([], body.minBody);
            let vcost = ccost;
            body.upgrade.forEach((part) => {
                for (let k = 0; k < Math.floor(part.ratio * i); k++) {
                    vbody.push(part.part);
                }
            });
            vcost = bodyCost(vbody);
            if (vcost < energy) {
                cbody = vbody;
                ccost = vcost;
                continue;
            }
            break;
        }
    }
    return {
        cost: ccost,
        body: cbody,
    }
}
