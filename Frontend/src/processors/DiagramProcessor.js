// DiagramProcessor & ChartProcessor: maintains vector flowcharts, UML arrows & chart color meanings
export class DiagramProcessor {
  static preserveVectorDiagram(r, g, b, h, s, l) {
    // Keep arrow colors, node lines understandable
    return [r, g, b];
  }
}

export class ChartProcessor {
  static protectChartColors(r, g, b, h, s, l) {
    // Green=Green, Red=Red, Blue=Blue, Yellow=Yellow
    if (s > 0.2) return [r, g, b];
    return null;
  }
}
