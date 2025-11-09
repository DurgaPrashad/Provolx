#!/usr/bin/env python3
"""
Benchmarking script for Provolx system components
"""

import time
import requests
import json
import threading
from concurrent.futures import ThreadPoolExecutor
import statistics

class ProvolxBenchmark:
    def __init__(self):
        self.backend_url = "http://localhost:3000"
        self.ai_service_url = "http://localhost:8001"
        self.frontend_url = "http://localhost:5173"
        
    def benchmark_backend_health(self):
        """Benchmark backend health endpoint"""
        try:
            start_time = time.time()
            response = requests.get(f"{self.backend_url}/")
            end_time = time.time()
            
            return {
                "endpoint": "Backend Health",
                "response_time": (end_time - start_time) * 1000,  # Convert to milliseconds
                "status_code": response.status_code,
                "success": response.status_code == 200
            }
        except Exception as e:
            return {
                "endpoint": "Backend Health",
                "error": str(e),
                "success": False
            }
    
    def benchmark_ai_service_health(self):
        """Benchmark AI service health endpoint"""
        try:
            start_time = time.time()
            response = requests.get(f"{self.ai_service_url}/health")
            end_time = time.time()
            
            return {
                "endpoint": "AI Service Health",
                "response_time": (end_time - start_time) * 1000,
                "status_code": response.status_code,
                "success": response.status_code == 200
            }
        except Exception as e:
            return {
                "endpoint": "AI Service Health",
                "error": str(e),
                "success": False
            }
    
    def benchmark_ai_chat_response(self):
        """Benchmark AI chat response time"""
        try:
            payload = {
                "message": "What are the common maintenance tasks for a 2023 VW Taigun?",
                "token": "test_token",
                "sheetData": {
                    "name": "Vehicle Maintenance Data",
                    "columns": [
                        {"name": "VehicleID"},
                        {"name": "Model"},
                        {"name": "Year"},
                        {"name": "ServiceType"},
                        {"name": "Mileage"}
                    ],
                    "dataPreview": [
                        ["V1001", "VW Taigun", 2023, "Oil Change", 15000],
                        ["V1002", "VW Taigun", 2023, "Tire Rotation", 30000],
                        ["V1003", "VW Taigun", 2023, "Brake Service", 45000]
                    ],
                    "rowCount": 3
                }
            }
            
            start_time = time.time()
            response = requests.post(
                f"{self.ai_service_url}/chat",
                headers={"Content-Type": "application/json"},
                data=json.dumps(payload)
            )
            end_time = time.time()
            
            return {
                "endpoint": "AI Chat Response",
                "response_time": (end_time - start_time) * 1000,
                "status_code": response.status_code,
                "success": response.status_code == 200,
                "response_length": len(response.text) if response.status_code == 200 else 0
            }
        except Exception as e:
            return {
                "endpoint": "AI Chat Response",
                "error": str(e),
                "success": False
            }
    
    def benchmark_backend_chat_create(self):
        """Benchmark backend chat session creation"""
        try:
            payload = {
                "userId": "benchmark-user-id"
            }
            
            start_time = time.time()
            response = requests.post(
                f"{self.backend_url}/api/chat/create",
                headers={"Content-Type": "application/json"},
                data=json.dumps(payload)
            )
            end_time = time.time()
            
            return {
                "endpoint": "Backend Chat Create",
                "response_time": (end_time - start_time) * 1000,
                "status_code": response.status_code,
                "success": response.status_code == 201,
                "session_id": response.json().get("sessionId") if response.status_code == 201 else None
            }
        except Exception as e:
            return {
                "endpoint": "Backend Chat Create",
                "error": str(e),
                "success": False
            }
    
    def benchmark_concurrent_requests(self, endpoint_func, num_requests=10):
        """Benchmark concurrent requests to an endpoint"""
        results = []
        
        def make_request():
            return endpoint_func()
        
        with ThreadPoolExecutor(max_workers=5) as executor:
            futures = [executor.submit(make_request) for _ in range(num_requests)]
            for future in futures:
                try:
                    result = future.result()
                    results.append(result)
                except Exception as e:
                    results.append({
                        "error": str(e),
                        "success": False
                    })
        
        # Calculate statistics
        successful_results = [r for r in results if r.get("success", False) and "response_time" in r]
        if successful_results:
            response_times = [r["response_time"] for r in successful_results]
            return {
                "concurrent_test": True,
                "total_requests": num_requests,
                "successful_requests": len(successful_results),
                "avg_response_time": statistics.mean(response_times),
                "min_response_time": min(response_times),
                "max_response_time": max(response_times),
                "median_response_time": statistics.median(response_times)
            }
        else:
            return {
                "concurrent_test": True,
                "total_requests": num_requests,
                "successful_requests": 0,
                "error": "All requests failed"
            }
    
    def run_all_benchmarks(self):
        """Run all benchmarks and return results"""
        print("Starting Provolx Benchmark Tests...")
        print("=" * 50)
        
        results = []
        
        # Single request benchmarks
        benchmarks = [
            self.benchmark_backend_health,
            self.benchmark_ai_service_health,
            self.benchmark_ai_chat_response,
            self.benchmark_backend_chat_create
        ]
        
        for benchmark in benchmarks:
            print(f"Running {benchmark.__name__}...")
            result = benchmark()
            results.append(result)
            print(f"  Result: {result}")
        
        # Concurrent request benchmarks
        print("\nRunning concurrent request benchmarks...")
        concurrent_results = [
            self.benchmark_concurrent_requests(self.benchmark_backend_health, 20),
            self.benchmark_concurrent_requests(self.benchmark_ai_chat_response, 10)
        ]
        
        for result in concurrent_results:
            results.append(result)
            print(f"  Concurrent Result: {result}")
        
        return results

if __name__ == "__main__":
    benchmark = ProvolxBenchmark()
    results = benchmark.run_all_benchmarks()
    
    # Print summary
    print("\n" + "=" * 50)
    print("BENCHMARK SUMMARY")
    print("=" * 50)
    
    successful = [r for r in results if r.get("success", False) or r.get("concurrent_test", False)]
    failed = [r for r in results if not r.get("success", True) and not r.get("concurrent_test", False)]
    
    print(f"Successful tests: {len(successful)}")
    print(f"Failed tests: {len(failed)}")
    
    if failed:
        print("\nFailed tests:")
        for result in failed:
            print(f"  - {result.get('endpoint', 'Unknown')}: {result.get('error', 'Unknown error')}")