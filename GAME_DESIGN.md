# AI Incremental Game - Design Document

## Game Overview

An AI-themed incremental game where players build an AI empire through resource management and automation.

## Resource Types (9 Layers)

### 1. Raw Data

- **Description**: The first resource, trickles in slowly ("scraping datasets")
- **Generation**: Passive, slow trickle
- **Purpose**: Base resource for everything else

### 2. Processors

- **Description**: Generate Data faster (better hardware)
- **Cost**: Raw Data
- **Effect**: Increases Raw Data generation rate

### 3. Models

- **Description**: Consume Data, generate Compute Power (training simple AIs)
- **Cost**: Raw Data
- **Effect**: Generates Compute Power

### 4. Algorithms

- **Description**: Consume Compute Power, generate Optimization (better efficiency)
- **Cost**: Compute Power
- **Effect**: Generates Optimization

### 5. Neural Nets

- **Description**: Consume Optimization, generate Insights (abstract progress)
- **Cost**: Optimization
- **Effect**: Generates Insights

### 6. Frameworks

- **Description**: Consume Insights, generate Scale (TensorFlow, PyTorch style)
- **Cost**: Insights
- **Effect**: Generates Scale

### 7. Data Centers

- **Description**: Consume Scale, generate Global AI Progress (massive infrastructure)
- **Cost**: Scale
- **Effect**: Generates Global AI Progress

### 8. Research Labs

- **Description**: Consume Global AI Progress, generate Breakthroughs (cutting-edge research)
- **Cost**: Global AI Progress
- **Effect**: Generates Breakthroughs

## Resource Flow

```
Raw Data → Processors (improves Raw Data generation)
Raw Data → Models → Compute Power
Compute Power → Algorithms → Optimization
Optimization → Neural Nets → Insights
Insights → Frameworks → Scale
Scale → Data Centers → Global AI Progress
Global AI Progress → Research Labs → Breakthroughs
```

## Game Mechanics

- Each resource has a cost and generation rate
- Players can purchase upgrades to increase efficiency
- Higher-tier resources unlock more advanced capabilities
- The goal is to maximize Breakthroughs through Research Labs
