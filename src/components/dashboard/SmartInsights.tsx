'use client';

import { Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function SmartInsights() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none">
                <CardContent className="p-4 flex items-start gap-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                        <Lightbulb className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm opacity-90">Smart Insight</h4>
                        <p className="text-xs mt-1 leading-relaxed opacity-90">
                            Pengeluaran makan Anda naik <strong>18%</strong> dibanding bulan lalu. Coba masak sendiri minggu ini?
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-none">
                <CardContent className="p-4 flex items-start gap-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm opacity-90">Limit Warning</h4>
                        <p className="text-xs mt-1 leading-relaxed opacity-90">
                            Hati-hati, sisa batas harian Anda tinggal <strong>25%</strong> untuk hari ini.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-none hidden lg:block">
                <CardContent className="p-4 flex items-start gap-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm opacity-90">On Track</h4>
                        <p className="text-xs mt-1 leading-relaxed opacity-90">
                            Anda diproyeksikan bisa menabung <strong>Rp 5.2jt</strong> bulan ini jika konsisten.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
