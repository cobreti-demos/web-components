export function stateDiff<STATETYPE extends {}>(newState: STATETYPE, oldState: STATETYPE) : STATETYPE {

    type StateTypeKeys = Array<keyof STATETYPE>;

    let changes : STATETYPE = {} as STATETYPE;

    const newStateKeys = new Set(Object.keys(newState) as StateTypeKeys);

    newStateKeys.forEach( k => {
        if (!(k in oldState) || oldState[k] !== newState[k]) {
            changes[k] = newState[k];
        }
    });

    return changes;
}
