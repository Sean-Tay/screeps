// Implement some way to track persistent goals across Game Ticks per Unit Type.
class UnitCoordinator {
    constructor() {
        // key: Target Id
        // value: Set of Unit Ids
        this.roomTargetAssignmentMap = new Map()
        
        // key: Unit Id
        // value: Target Id
        this.roomUnitAssignmentMap = new Map()
        
        this.freeUnits = new Set() // Set of Unit Ids
    }
    
    // TODO: Serialize into JSON.stringify friendly format and Deserialize back to expected Data Structures
    
    registerUnit(unit) {
        this.freeUnits.add(unit.id)
    }
    
    allocateUnit(unitId, targetId) {
        this.freeUnits.remove(unitId)
        
        this.roomTargetAssignmentMap.get(targetId).add(unitId)
        this.roomUnitAssignmentMap.set(unitId, targetId)
    }
    
    allocateAvailableUnits(targetId, limit) {
        const targetAssignmentSet = this.roomTargetAssignmentMap.get(target.id)
        if (targetAssignmentSet.size >= limit) return
        
        const freeUnitIds = Array.from(this.freeUnits).slice(0, limit - targetAssignmentSet.size)
        freeUnitIds.forEach((unitID) => this.allocateUnit(unitId, targetId))
    }
    
    deallocateUnit(unitId, recycle = true) {
        const assignedTargetId = this.roomUnitAssignmentMap.get(unitId)
        this.roomUnitAssignmentMap.delete(unitId)
        this.roomTargetAssignmentMap.get(assignedTargetId).delete(unitId)
        if (recycle) this.freeUnits.add(unitId)
    }
	
	deallocateUnitsFromTarget(targetId) {
		const assignedUnitIds = this.roomTargetAssignmentMap.get(trackedTargetId)
		for (const unitId of assignedUnitIds) {
			this.deallocateUnit(unitId)
		}
	}
    
    update(targets) {
        // Check if tracked Units are still alive, and if not, remove them
        const trackedUnitIds = Array.from(this.roomUnitAssignmentMap.keys())
        for (const trackedUnitId of trackedUnitIds) {
            if (Game.getObjectById(trackedUnitId) == null) this.deallocateUnit(trackedUnitId, false)
        }
        
        const targetSet = new Set(targets)
        // // Get all Targets of interest in current Room
        // const findTargets = [FIND_SOURCES_ACTIVE, FIND_DROPPED_RESOURCES]
        // for (const findTarget of findTargets) {
        //     targetSet.union(room.find(findTarget))
        // }
        
        // Clear all outdated Targets and free up assigned Units
        const trackedTargetIds = Array.from(this.roomTargetAssignmentMap.keys()) // Shallow Copy of the Key Iterator here as doing modifications within the loop
        for (const trackedTargetId of trackedTargetIds) {
            if (!targetSet.has(trackedTargetId)) {
				this.deallocateUnitsFromTarget(trackedTargetId)
                this.roomTargetAssignmentMap.delete(trackedTargetId)
            } 
        }
        
		// TODO: Sort targetSet by some priority
        // Update Target Assignment Map with Target Ids, if not already tracked, and assign available Units
        for (const target of targetSet) {
            if (!this.roomTargetAssignmentMap.has(target.id)) this.roomTargetAssignmentMap.set(target.id, new Set())
            
            this.allocateAvailableUnits(target.id, 3) // Should we do this here?
        }
    }
}
