from pydantic import BaseModel
from typing import List, Optional


class KPIOverview(BaseModel):
    total_tickets: int
    resolved: int
    pending: int
    urgent: int
    resolution_rate: float
    avg_resolution_time: str
    total_tickets_trend: str
    resolved_trend: str
    pending_trend: str
    urgent_trend: str


class TrendPoint(BaseModel):
    day: str
    total: int
    resolved: int
    pending: int


class DistributionItem(BaseModel):
    name: str
    value: float
    count: int


class ProductComplaint(BaseModel):
    product: str
    count: int
    percentage: float


class CSPerformance(BaseModel):
    name: str
    role: str
    assigned: int
    resolved: int
    pending: int
    avg_response: str
    resolution_rate: float
    status: str


class AnalyticsOverview(BaseModel):
    kpi: KPIOverview
    trend: List[TrendPoint]
    severity_distribution: List[DistributionItem]
    sentiment_distribution: List[DistributionItem]
    product_complaints: List[ProductComplaint]
    category_distribution: List[DistributionItem]
    cs_performance: List[CSPerformance]

class AIInsightOverview(BaseModel):
    id: str
    title: str
    category: str
    ticket_count: int
    percentage: float
    severity: str
    trend: str
    related_product: str
    description: str
    evidence: dict
    related_products: list
    sentiment: dict
    ai_interpretation: str
    considerations: list


class AIInsightsResponse(BaseModel):
    insights: list[AIInsightOverview]
    generated_at: str