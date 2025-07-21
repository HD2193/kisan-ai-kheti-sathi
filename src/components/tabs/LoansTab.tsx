import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import VoiceButton from '@/components/VoiceButton';
import { 
  CreditCard, 
  Shield, 
  Calculator,
  FileText,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Search
} from 'lucide-react';

interface LoansTabProps {
  language: string;
}

interface LoanScheme {
  id: string;
  name: string;
  type: 'loan' | 'insurance' | 'subsidy';
  provider: string;
  interestRate?: number;
  maxAmount: number;
  eligibility: string[];
  documents: string[];
  description: string;
  applicationLink: string;
  popular: boolean;
}

const LoansTab: React.FC<LoansTabProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'loans' | 'insurance' | 'calculator'>('loans');
  const [searchQuery, setSearchQuery] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');

  const [schemes] = useState<LoanScheme[]>([
    {
      id: '1',
      name: 'PM Kisan Credit Card',
      type: 'loan',
      provider: 'Government of India',
      interestRate: 4,
      maxAmount: 500000,
      eligibility: ['Land ownership documents', 'Aadhaar card', 'Valid farming activity'],
      documents: ['Land records', 'Aadhaar', 'Bank passbook', 'Crop details'],
      description: 'Short-term credit for farming activities with subsidized interest rates',
      applicationLink: 'https://pmkisan.gov.in/',
      popular: true
    },
    {
      id: '2',
      name: 'PM Fasal Bima Yojana',
      type: 'insurance',
      provider: 'Government of India',
      maxAmount: 200000,
      eligibility: ['Farmer with Aadhaar', 'Land records', 'Bank account'],
      documents: ['Aadhaar', 'Land documents', 'Bank details', 'Sowing certificate'],
      description: 'Crop insurance scheme to protect farmers against crop loss',
      applicationLink: 'https://pmfby.gov.in/',
      popular: true
    },
    {
      id: '3',
      name: 'Agriculture Infrastructure Fund',
      type: 'loan',
      provider: 'NABARD',
      interestRate: 3,
      maxAmount: 10000000,
      eligibility: ['FPO/Cooperative', 'Project proposal', 'Collateral'],
      documents: ['Project report', 'FPO registration', 'Financial statements'],
      description: 'Infrastructure development loan for post-harvest management',
      applicationLink: 'https://nabard.org/',
      popular: false
    },
    {
      id: '4',
      name: 'Mudra Loan - Kishore',
      type: 'loan',
      provider: 'Banks/NBFCs',
      interestRate: 8.5,
      maxAmount: 500000,
      eligibility: ['Business plan', 'Aadhaar', 'Income proof'],
      documents: ['Business plan', 'Aadhaar', 'PAN', 'Bank statements'],
      description: 'Business loan for agricultural activities and allied sectors',
      applicationLink: 'https://mudra.org.in/',
      popular: false
    },
    {
      id: '5',
      name: 'Drip Irrigation Subsidy',
      type: 'subsidy',
      provider: 'State Government',
      maxAmount: 50000,
      eligibility: ['Small/marginal farmer', 'Land ownership', 'Water source'],
      documents: ['Land records', 'Aadhaar', 'Water source certificate'],
      description: 'Subsidy for installing drip irrigation systems',
      applicationLink: '#',
      popular: true
    }
  ]);

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    return activeTab === 'calculator' ? true : 
           activeTab === 'loans' ? (scheme.type === 'loan' && matchesSearch) :
           (scheme.type === 'insurance' || scheme.type === 'subsidy') && matchesSearch;
  });

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(tenure) * 12;
    
    if (P && r && n) {
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      return emi.toFixed(0);
    }
    return '0';
  };

  const handleVoiceQuery = (transcript: string, response: string) => {
    console.log('Loan voice query:', { transcript, response });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'loan':
        return <CreditCard className="w-5 h-5 text-primary" />;
      case 'insurance':
        return <Shield className="w-5 h-5 text-blue-500" />;
      case 'subsidy':
        return <CheckCircle className="w-5 h-5 text-success" />;
      default:
        return <FileText className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'loan':
        return 'bg-primary/10 text-primary';
      case 'insurance':
        return 'bg-blue-500/10 text-blue-500';
      case 'subsidy':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="pb-20 p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Loans & Insurance
        </h1>
        <div className="text-dual-lang">
          <p className="text-primary-lang text-muted-foreground">
            Government schemes and financial assistance for farmers
          </p>
          <p className="text-secondary-lang text-sm text-muted-foreground">
            किसानों के लिए सरकारी योजनाएं और वित्तीय सहायता
          </p>
        </div>
      </div>

      {/* Voice Assistant */}
      <Card className="card-kisan">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Ask about Schemes
            </h3>
            <p className="text-sm text-muted-foreground">
              Get personalized loan and insurance recommendations
            </p>
          </div>
          <VoiceButton
            language={language}
            size="md"
            onTranscript={(transcript) => console.log('Voice input:', transcript)}
            onResponse={(response) => handleVoiceQuery('', response)}
          />
        </div>
        
        <div className="bg-muted/30 rounded-lg p-4">
          <p className="text-sm text-muted-foreground text-center">
            "मुझे कृषि लोन चाहिए" या "What insurance is best for wheat crop?"
          </p>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex space-x-2">
        <Button
          variant={activeTab === 'loans' ? 'default' : 'outline'}
          onClick={() => setActiveTab('loans')}
          className="flex-1"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Loans
        </Button>
        <Button
          variant={activeTab === 'insurance' ? 'default' : 'outline'}
          onClick={() => setActiveTab('insurance')}
          className="flex-1"
        >
          <Shield className="w-4 h-4 mr-2" />
          Insurance
        </Button>
        <Button
          variant={activeTab === 'calculator' ? 'default' : 'outline'}
          onClick={() => setActiveTab('calculator')}
          className="flex-1"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Calculator
        </Button>
      </div>

      {/* Calculator Tab */}
      {activeTab === 'calculator' && (
        <Card className="card-kisan space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            EMI Calculator
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Loan Amount (₹)
              </label>
              <Input
                type="number"
                placeholder="100000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Interest Rate (%)
              </label>
              <Input
                type="number"
                placeholder="4"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Tenure (years)
              </label>
              <Input
                type="number"
                placeholder="5"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
              />
            </div>
          </div>
          
          {loanAmount && interestRate && tenure && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Monthly EMI
                </p>
                <p className="text-3xl font-bold text-primary">
                  ₹{parseInt(calculateEMI()).toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Total Amount: ₹{(parseInt(calculateEMI()) * parseInt(tenure) * 12).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Search (for loans and insurance tabs) */}
      {activeTab !== 'calculator' && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search schemes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      {/* Schemes List */}
      {activeTab !== 'calculator' && (
        <div className="space-y-4">
          {/* Popular Schemes */}
          {filteredSchemes.some(s => s.popular) && (
            <>
              <h3 className="text-lg font-semibold text-foreground">
                Popular Schemes
              </h3>
              
              {filteredSchemes.filter(scheme => scheme.popular).map((scheme) => (
                <Card key={scheme.id} className="card-feature p-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getTypeIcon(scheme.type)}
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-foreground">
                              {scheme.name}
                            </h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(scheme.type)}`}>
                              {scheme.type}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {scheme.provider}
                          </p>
                          <p className="text-sm text-foreground">
                            {scheme.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Max Amount:</span>
                        <p className="font-medium text-foreground">
                          ₹{scheme.maxAmount.toLocaleString()}
                        </p>
                      </div>
                      {scheme.interestRate && (
                        <div>
                          <span className="text-muted-foreground">Interest Rate:</span>
                          <p className="font-medium text-success">
                            {scheme.interestRate}% p.a.
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2">
                        Required Documents:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {scheme.documents.slice(0, 3).map((doc, index) => (
                          <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                            {doc}
                          </span>
                        ))}
                        {scheme.documents.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{scheme.documents.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="btn-primary">
                        <ExternalLink className="w-3 h-3 mr-2" />
                        Apply Now
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="w-3 h-3 mr-2" />
                        Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </>
          )}
          
          {/* Other Schemes */}
          {filteredSchemes.some(s => !s.popular) && (
            <>
              <h3 className="text-lg font-semibold text-foreground">
                Other Schemes
              </h3>
              
              {filteredSchemes.filter(scheme => !scheme.popular).map((scheme) => (
                <Card key={scheme.id} className="card-feature p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      {getTypeIcon(scheme.type)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-foreground">
                            {scheme.name}
                          </h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(scheme.type)}`}>
                            {scheme.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {scheme.provider}
                        </p>
                        <p className="text-xs text-foreground mt-1">
                          Max: ₹{scheme.maxAmount.toLocaleString()}
                          {scheme.interestRate && ` • ${scheme.interestRate}% interest`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </>
          )}
          
          {filteredSchemes.length === 0 && (
            <Card className="card-kisan text-center py-8">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No schemes found matching your criteria
              </p>
              <p className="text-sm text-muted-foreground">
                Try different search terms or browse all categories
              </p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default LoansTab;
