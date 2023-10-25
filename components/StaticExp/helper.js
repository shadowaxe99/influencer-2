export function getMorphTargets(model) {
    if (model.morphTargetInfluences) {
        return model.morphTargetInfluences;
    }

    let result = null;
    model.children.forEach((child) => {
        if (!result) {
            result = getMorphTargets(child);
        }
    });

    return result;
}