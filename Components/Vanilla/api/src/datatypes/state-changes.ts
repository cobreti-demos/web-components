export interface StateChanges<STATETYPE> {
    oldState: STATETYPE,
    state: STATETYPE,
    changes: STATETYPE
}
