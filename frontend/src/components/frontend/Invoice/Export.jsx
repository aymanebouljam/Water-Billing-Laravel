import { useState } from 'react'
import adobe from '../../../assets/images/adobe.png'
import { useEffect } from 'react';
import axios from 'axios';
import { URL } from '../../common/URL'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../../../assets/images/logo2.png'


function Export({id}){
    const [invoice, setInvoice] = useState({});
    const [taxes, setTaxes] = useState([]);

    
    const token = String(localStorage.getItem('token'))
    if(token){
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
 
    // Calculating subTotal
    const calculateSubTotal = () => {
        if(invoice.parts && invoice.parts.length > 0){
            const subTotal = invoice.parts.reduce((sum, part) => (
                sum + (part.price * part.pivot.quantity)
        ),0)
            return Number(subTotal.toFixed(2))
        }
    }
    // Calculating amount for each tax
    const calculateTaxAmount = () =>{
        const subTotal =  calculateSubTotal()
        let accumulator = subTotal
        if(taxes.length > 0 && accumulator > 0){
            const taxAmounts = taxes.map(tax =>{
                   const taxAmount = accumulator * tax.rate
                    accumulator += taxAmount
                   return taxAmount.toFixed(2)
            })
            return taxAmounts
        }
        return []
    }

    // fetchin invoice
    useEffect(()=>{
        const fetchInvoice = async()=>{
            try{
                const res = await axios.get(`${URL}invoices/${id}`)
                if(res.data.error){
                    throw new Error(res.data.error)
                }else{
                    setInvoice(res.data.invoice)
                    setTaxes(res.data.taxes)
                }
            }catch(err){
                console.error(err)
            }
        }
        fetchInvoice()
    },[id])
    // Numbers to letters
    function numberToFrenchWords(number) {
        const ones = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
        const teens = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
        const tens = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante", "quatre-vingt", "quatre-vingt"];

        if (number === 0) return "zéro";

        if (number < 10) return ones[number];

        if (number < 20) return teens[number - 10];

        if (number < 100) {
            let ten = Math.floor(number / 10);
            let unit = number % 10;
            let separator = unit === 1 && ten !== 8 ? " et " : "-";

            if (ten === 7 || ten === 9) {
                return tens[ten] + separator + teens[unit];
            } else {
                return tens[ten] + (unit ? separator + ones[unit] : "");
            }
        }

        if (number < 1000) {
            let hundred = Math.floor(number / 100);
            let remainder = number % 100;
            let hundredPrefix = hundred > 1 ? ones[hundred] + " cent" : "cent";

            return hundredPrefix + (remainder ? (hundred > 1 && remainder < 10 ? " " : " ") + numberToFrenchWords(remainder) : "");
        }

        if (number < 1000000) {
            let thousand = Math.floor(number / 1000);
            let remainder = number % 1000;
            let thousandPrefix = thousand === 1 ? "mille" : numberToFrenchWords(thousand) + " mille";

            return thousandPrefix + (remainder ? " " + numberToFrenchWords(remainder) : "");
        }

        if (number < 1000000000) {
            let million = Math.floor(number / 1000000);
            let remainder = number % 1000000;
            let millionPrefix = million === 1 ? "un million" : numberToFrenchWords(million) + " millions";

            return millionPrefix + (remainder ? " " + numberToFrenchWords(remainder) : "");
        }

        return number.toString();
        }



        // Handle decimal
    function convertTotalToWords(total) {
        if(!total){
            return '';
        }
        const [integerPart, decimalPart] = total.toFixed(2).split("."); 

        const integerWords = numberToFrenchWords(parseInt(integerPart)) + " Dirhams";
        const decimalValue = parseInt(decimalPart);

        let decimalWords = "";
        if (decimalValue > 0) {
            decimalWords = " et " + numberToFrenchWords(decimalValue) + 
            (decimalValue === 1 ? " Centime" : " Centimes");
        }

        return integerWords + decimalWords;
        }


    // Export as PDF
    const printPDF = () => {
        const doc = new jsPDF();
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
        const pageWidth = doc.internal.pageSize.width;
        const titleX = pageWidth / 2;
        const rightAlignX = pageWidth - 14;
        const logoUrl = logo;
        const logoWidth = 35;
        const logoHeight = 25;
        const logoX = titleX - (logoWidth / 2) + 2;
        const logoY = 5;
    
        doc.addImage(logoUrl, 'PNG', logoX, logoY, logoWidth, logoHeight);
    
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text("ROYAUME DU MAROC", titleX, 40, { align: 'center' });
        doc.text("OFFICE NATIONAL DE L'ELECTRICITE ET DE L'EAU POTABLE", titleX, 47, { align: 'center' });
        doc.text('BRANCHE EAU', titleX, 52, { align: 'center' });
        doc.text('DIRECTION RÉGIONALE: GUELMIM', titleX, 59, { align: 'center' });
        doc.text('CENTRE: BOUIZAKARNE', titleX, 66, { align: 'center' });
        doc.text('C.C.P.N°: 106-28-C', titleX, 73, { align: 'center' });
    
        const secondSectionY = 80;
    
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
    
        doc.text(`Le: ${formattedDate}`, rightAlignX, secondSectionY, { align: 'right' });
        doc.text(invoice?.reference ? `Facture N°: ${invoice?.reference}` : `Devis N°: ${invoice?.id}`, rightAlignX, secondSectionY + 5, { align: 'right' });
        doc.text(`Nom du Client: ${invoice?.client?.toUpperCase()}`, 14, secondSectionY + 10);
        if(invoice?.contract){
            doc.text(`Police N°: ${invoice.contract || ''}`, 14, secondSectionY + 15);
        }
    
        const table = document.querySelector('#invoiceTable');
        autoTable(doc, { 
            html: table,
            headStyles: { 
                fillColor: [43, 97, 155],
                textColor: [255, 255, 255],
                fontSize: 12,
                fontStyle: 'bold',
            },
            bodyStyles: {
                fontSize: 10,
                cellPadding: 4,
            },
            margin: { top: secondSectionY + 20 },
            theme: 'striped',
            styles: {
                cellWidth: 'auto',
                minCellHeight: 10,
                halign: 'center',
            },
            columnStyles: {
                0: { cellWidth: 'auto', halign: 'left' },
                1: { cellWidth: 'auto', halign: 'center' },
                2: { cellWidth: 'auto', halign: 'center' },
                3: { cellWidth: 'auto', halign: 'center' },
            }
        });
    
        doc.save('invoice.pdf');
    };

    return(
  
        <>
            <div className="export w-full flex flex-col gap-y-4  justify-center items-center">
                <h1 className='text-2xl text-white font-medium  text-center  pb-5 w-1/3 animate-pulse'>Télécharger la Facture</h1>
                <div className="flex items-center justify-center gap-x-16 w-1/2 h-1/2 bg-white/15  backdrop-blur-lg shadow-xl rounded-3xl  hover:animate-none">
                    <button onClick={printPDF}>
                        <img src={adobe} alt='Adobe PDf' className='w-32 h-32 animate-bounce hover:animate-none'/>
                    </button>
                </div>
            </div>
            <table className='w-full hidden' id='invoiceTable'>
                <thead>
                    <tr>
                        <th>Désignation</th>
                        <th>Prix Unitaire</th>
                        <th>Quantité</th>
                        <th>Total HT</th>
                    </tr>
                </thead>
                <tbody>
                    {(invoice?.parts?.length > 0) &&(
                        invoice.parts.map(part => (
                            <tr key={part.id}>
                                <td>{part.label}</td>
                                <td>{part.price}</td>
                                <td>{part.pivot.quantity}</td>
                                <td>{(part.price * part.pivot.quantity).toFixed(2)}</td>
                            </tr>
                        ))
                    )}
                    <tr>
                        <td colSpan='3'>Total HT</td>
                        <td>{calculateSubTotal()}</td>
                    </tr>
                    {
                        (taxes?.length > 0) &&(
                            taxes.map((tax,index) => (
                                <tr key={tax.id}>
                                    <td colSpan='3'>{tax.type} {tax.rate * 100}%</td>
                                    <td>{calculateTaxAmount()[index]}</td>
                                </tr>
                            ))
                        )
                    } 
                    <tr>
                        <td colSpan='3'>Total Général TTC</td>
                        <td>{invoice?.total?.toFixed(2)}</td>
                    </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td colSpan='4'>
                        Arrêtée la présente Facture à la somme de:
                    </td>
                </tr>
                <tr>
                        <td colSpan='4'>
                            {convertTotalToWords(invoice?.total)?.at(0)?.toUpperCase() + convertTotalToWords(invoice?.total)?.slice(1)}
                        </td>
                </tr>
                </tfoot>
            </table>
                        
        </>
    ) 
}
export default Export