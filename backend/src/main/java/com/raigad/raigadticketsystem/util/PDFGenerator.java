package com.raigad.raigadticketsystem.util;

import com.itextpdf.text.Document;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.FileOutputStream;

public class PDFGenerator {

    public static void generateTicket(
            String bookingId,
            Long userId,
            Long slotId,
            Integer visitorCount,
            Double totalAmount,
            String baseName,
            String filePath) {

        try {

            Document document = new Document();

            PdfWriter.getInstance(
                    document,
                    new FileOutputStream(filePath)
            );

            document.open();

            document.add(
                    new Paragraph(
                            "RAIGAD FORT TICKET"
                    )
            );

            document.add(
                    new Paragraph(" ")
            );

            document.add(
                    new Paragraph(
                            "Booking ID: " +
                                    bookingId
                    )
            );

            document.add(
                    new Paragraph(
                            "User ID: " +
                                    userId
                    )
            );

            document.add(
                    new Paragraph(
                            "Slot ID: " +
                                    slotId
                    )
            );

            document.add(
                    new Paragraph(
                            "Visitor Count: " +
                                    visitorCount
                    )
            );

            document.add(
                    new Paragraph(
                            "Total Amount: ₹" +
                                    totalAmount
                    )
            );

            document.add(
                    new Paragraph(" ")
            );

            document.add(
                    new Paragraph(
                            "Visitor QR Codes"
                    )
            );

            document.add(
                    new Paragraph(" ")
            );

            for (
                    int i = 1;
                    i <= visitorCount;
                    i++
            ) {

                String qrPath =
                        "qr-codes/" +
                                baseName +
                                "_" +
                                i +
                                ".png";

                document.add(
                        new Paragraph(
                                "Visitor " + i
                        )
                );

                Image qrImage =
                        Image.getInstance(
                                qrPath
                        );

                qrImage.scaleToFit(
                        150,
                        150
                );

                document.add(
                        qrImage
                );

                document.add(
                        new Paragraph(" ")
                );
            }

            document.close();

            System.out.println(
                    "PDF Generated Successfully"
            );

        } catch (Exception e) {

            e.printStackTrace();

        }
    }
}