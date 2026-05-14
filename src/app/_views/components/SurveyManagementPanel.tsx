import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileCheck, FileText, Upload, Calendar, CheckCircle2, User, Camera, ShieldAlert } from "lucide-react";

export function SurveyManagementPanel() {
  const [reportUploaded, setReportUploaded] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-5 border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><User className="w-24 h-24" /></div>
          <div className="relative z-10">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Assigned Surveyor Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-400">Firm Name</p>
                <p className="text-base font-medium text-slate-900">TopMark Loss Adjusters Ltd</p>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-xs text-slate-400">Contact Person</p>
                  <p className="text-sm font-medium text-slate-700">James Anderson</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Phone</p>
                  <p className="text-sm font-medium text-slate-700">+255 712 345 678</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Assignment Date</p>
                  <p className="text-sm font-medium text-slate-900 flex items-center gap-1"><Calendar className="w-3 h-3 text-aos-blue" /> 16 April 2026</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-aos-amber/10 text-aos-amber text-xs font-bold border border-aos-amber/20">
                  REPORT PENDING
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5 border-slate-200 shadow-sm flex flex-col justify-center items-center text-center border-dashed bg-slate-50/50">
          {!reportUploaded ? (
            <>
              <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Upload className="w-6 h-6 text-aos-blue" />
              </div>
              <h3 className="font-semibold text-slate-900">Upload Survey Report</h3>
              <p className="text-sm text-slate-500 mt-1 mb-4 max-w-[200px]">PDF, DOCX or ZIP files containing photos and assessment.</p>
              <button 
                onClick={() => setReportUploaded(true)}
                className="px-4 py-2 bg-aos-blue text-white rounded-lg text-sm font-medium hover:bg-aos-blue/90 transition-colors shadow-sm"
              >
                Browse Files
              </button>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-aos-emerald/10 border border-aos-emerald/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-aos-emerald" />
              </div>
              <h3 className="font-semibold text-slate-900">Report Uploaded Successfully</h3>
              <p className="text-sm text-slate-500 mt-1 mb-4">Final_Survey_Report_v1.pdf (4.2 MB)</p>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-1">
                  <FileText className="w-4 h-4" /> View
                </button>
                <button 
                  onClick={() => setReportUploaded(false)}
                  className="px-3 py-1.5 bg-white border border-slate-200 text-aos-rose rounded-lg text-sm font-medium hover:bg-rose-50 transition-colors shadow-sm"
                >
                  Remove
                </button>
              </div>
            </>
          )}
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Camera className="w-5 h-5 text-slate-400" /> Evidence & Attachments
          </h3>
          <button className="text-sm text-aos-blue hover:underline font-medium">Add Note</button>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-semibold text-slate-600">Document Type</TableHead>
                <TableHead className="font-semibold text-slate-600">File Name</TableHead>
                <TableHead className="font-semibold text-slate-600">Uploaded By</TableHead>
                <TableHead className="font-semibold text-slate-600">Date</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-slate-50/50">
                <TableCell>
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <FileCheck className="w-4 h-4 text-aos-emerald" /> Preliminary Assessment
                  </span>
                </TableCell>
                <TableCell className="text-slate-600">prelim_report.pdf</TableCell>
                <TableCell className="text-slate-600">J. Anderson</TableCell>
                <TableCell className="text-slate-600">17 Apr 2026</TableCell>
                <TableCell><button className="text-aos-blue text-sm font-medium hover:underline">View</button></TableCell>
              </TableRow>
              <TableRow className="hover:bg-slate-50/50">
                <TableCell>
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <Camera className="w-4 h-4 text-slate-400" /> Site Photos
                  </span>
                </TableCell>
                <TableCell className="text-slate-600">site_damage_photos.zip</TableCell>
                <TableCell className="text-slate-600">J. Anderson</TableCell>
                <TableCell className="text-slate-600">17 Apr 2026</TableCell>
                <TableCell><button className="text-aos-blue text-sm font-medium hover:underline">View</button></TableCell>
              </TableRow>
              {reportUploaded && (
                <TableRow className="hover:bg-slate-50/50 bg-aos-emerald/5">
                  <TableCell>
                    <span className="flex items-center gap-2 font-bold text-slate-900">
                      <FileText className="w-4 h-4 text-aos-emerald" /> Final Survey Report
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-900 font-medium">Final_Survey_Report_v1.pdf</TableCell>
                  <TableCell className="text-slate-600">System (You)</TableCell>
                  <TableCell className="text-slate-600">Just Now</TableCell>
                  <TableCell><button className="text-aos-blue text-sm font-medium hover:underline">View</button></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <div className="bg-slate-800 text-white p-4 rounded-xl flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-aos-amber shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-sm">Surveyor Recommendation</h4>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed">
            "Based on preliminary inspection, the cause of loss is consistent with the insured's statement (Electrical Short Circuit). We recommend a reserve of TZS 45,000,000 pending quotation from authorized repairers for the damaged server racks."
          </p>
        </div>
      </div>
    </div>
  );
}
