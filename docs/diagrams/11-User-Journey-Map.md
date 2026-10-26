# User Journey Map

## Overview

This diagram maps the user journey from identifying productivity problems to implementing the Smart Gallery System platform and achieving measurable results.

## Journey Stages

### Stage 1: Problem Identification

**Current State**: Manual, time-consuming process
- Staff needs to prepare presentations manually
- Copy files from network drive
- Rename files for organization
- Format images for display
- Arrange slides in order
- Test on display screen

**Pain Points**:
- ⏱️ **15-25 minutes of preparation per day**
- ❌ Human errors
- ❌ Inconsistent formatting
- ❌ Manual file management
- ❌ Repetitive tasks

### Stage 2: Solution Implementation

**One-Time Setup**:
1. Install Smart Gallery System on Raspberry Pi
2. Configure network paths (one-time setup)
3. Place content in folders (standard workflow)

**Setup Time**: < 30 minutes

### Stage 3: Automated Process

**System Automation**:
1. System detects new files (Chokidar Watcher)
2. Auto-optimizes images (Sharp Processing)
3. Generates thumbnails (Performance optimization)
4. Updates display instantly (WebSocket real-time updates)

**Benefits**:
- ✅ **~70% less preparation time**
- ✅ No outdated printouts on the board
- ✅ Consistent formatting
- ✅ Real-time updates (< 5ms latency)

### Stage 4: Result

**Outcomes**:
- ✅ Presentation ready in **< 5 minutes**
- ✅ Display updates automatically
- ✅ Staff focuses on content, not formatting
- ✅ Consistent quality across all displays

## Results from the pilot

Measured with warehouse managers during the bachelor-project pilot (interviews and a 30-person survey):

| Metric | Before | After |
|--------|--------|-------|
| Daily meeting preparation | 15-25 minutes | under 5 minutes (~70% less) |
| Printed pages per department | 250-600 per month | none for the boards |
| Training needed | - | 0-15 minutes |
| Usability rating | - | 9.5 / 10 |

A manager estimated the saving at 500-1,000 DKK per screen per month (time plus paper and toner).

## User Experience Improvements

### Before Smart Gallery System
- ❌ Manual file copying
- ❌ Manual renaming
- ❌ Manual formatting
- ❌ Manual testing
- ❌ High error rate
- ❌ Inconsistent quality

### After Smart Gallery System
- ✅ Automatic file detection
- ✅ Automatic optimization
- ✅ Automatic formatting
- ✅ Automatic display updates
- ✅ Zero error rate
- ✅ Consistent quality

## Diagram Location

**PlantUML File**: `DIAGRAMS/PLANTUML-DIAGRAMS.puml`  
**Diagram ID**: `Diagram-11-User-Journey-Map`

To render this diagram:
1. Open `PLANTUML-DIAGRAMS.puml`
2. Find `@startuml Diagram-11-User-Journey-Map`
3. Copy the entire diagram block (until `@enduml`)
4. Paste into PlantText.com
5. Export as PNG/SVG

---

**Purpose**: This diagram demonstrates how Smart Gallery System solves the productivity problem, showing the transformation from manual, error-prone processes to automated, efficient workflows with measurable ROI.

