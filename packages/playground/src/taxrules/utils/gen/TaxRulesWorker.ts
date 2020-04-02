// Generated by the ProjectIt Language Generator (4/1/2020, 2:08:57 PM).
import {
    AbsExpression,
    AndExpression,
    BinaryExpression,
    BooleanLiteralExpression,
    ComparisonExpression,
    DivideExpression,
    EqualsExpression,
    Expression,
    GreaterThenExpression,
    IfExpression,
    IncomePart,
    IncomeType,
    LessThenExpression,
    LiteralExpression,
    Money,
    MoneyLiteralExp,
    MultiplyExpression,
    NumberLiteralExpression,
    OrExpression,
    PercentageExpression,
    PlaceholderExpression,
    PlusExpression,
    RevenueService,
    RuleParameter,
    StringLiteralExpression,
    TaxID,
    TaxPayer,
    TaxPayerType,
    TaxRule,
    TaxRuleCall,
    TaxRuleSet
} from "../../language/gen/";

export interface TaxRulesWorker {
    execBeforeRevenueService(modelelement: RevenueService);
    execAfterRevenueService(modelelement: RevenueService);

    execBeforeTaxRuleSet(modelelement: TaxRuleSet);
    execAfterTaxRuleSet(modelelement: TaxRuleSet);

    execBeforeTaxPayer(modelelement: TaxPayer);
    execAfterTaxPayer(modelelement: TaxPayer);

    execBeforeIncomePart(modelelement: IncomePart);
    execAfterIncomePart(modelelement: IncomePart);

    execBeforeMoney(modelelement: Money);
    execAfterMoney(modelelement: Money);

    execBeforeTaxID(modelelement: TaxID);
    execAfterTaxID(modelelement: TaxID);

    execBeforeTaxRule(modelelement: TaxRule);
    execAfterTaxRule(modelelement: TaxRule);

    execBeforeRuleParameter(modelelement: RuleParameter);
    execAfterRuleParameter(modelelement: RuleParameter);

    execBeforePercentageExpression(modelelement: PercentageExpression);
    execAfterPercentageExpression(modelelement: PercentageExpression);

    execBeforeMoneyLiteralExp(modelelement: MoneyLiteralExp);
    execAfterMoneyLiteralExp(modelelement: MoneyLiteralExp);

    execBeforeTaxRuleCall(modelelement: TaxRuleCall);
    execAfterTaxRuleCall(modelelement: TaxRuleCall);

    execBeforeExpression(modelelement: Expression);
    execAfterExpression(modelelement: Expression);

    execBeforePlaceholderExpression(modelelement: PlaceholderExpression);
    execAfterPlaceholderExpression(modelelement: PlaceholderExpression);

    execBeforeLiteralExpression(modelelement: LiteralExpression);
    execAfterLiteralExpression(modelelement: LiteralExpression);

    execBeforeStringLiteralExpression(modelelement: StringLiteralExpression);
    execAfterStringLiteralExpression(modelelement: StringLiteralExpression);

    execBeforeNumberLiteralExpression(modelelement: NumberLiteralExpression);
    execAfterNumberLiteralExpression(modelelement: NumberLiteralExpression);

    execBeforeBooleanLiteralExpression(modelelement: BooleanLiteralExpression);
    execAfterBooleanLiteralExpression(modelelement: BooleanLiteralExpression);

    execBeforeAbsExpression(modelelement: AbsExpression);
    execAfterAbsExpression(modelelement: AbsExpression);

    execBeforeBinaryExpression(modelelement: BinaryExpression);
    execAfterBinaryExpression(modelelement: BinaryExpression);

    execBeforeMultiplyExpression(modelelement: MultiplyExpression);
    execAfterMultiplyExpression(modelelement: MultiplyExpression);

    execBeforePlusExpression(modelelement: PlusExpression);
    execAfterPlusExpression(modelelement: PlusExpression);

    execBeforeDivideExpression(modelelement: DivideExpression);
    execAfterDivideExpression(modelelement: DivideExpression);

    execBeforeAndExpression(modelelement: AndExpression);
    execAfterAndExpression(modelelement: AndExpression);

    execBeforeOrExpression(modelelement: OrExpression);
    execAfterOrExpression(modelelement: OrExpression);

    execBeforeComparisonExpression(modelelement: ComparisonExpression);
    execAfterComparisonExpression(modelelement: ComparisonExpression);

    execBeforeLessThenExpression(modelelement: LessThenExpression);
    execAfterLessThenExpression(modelelement: LessThenExpression);

    execBeforeGreaterThenExpression(modelelement: GreaterThenExpression);
    execAfterGreaterThenExpression(modelelement: GreaterThenExpression);

    execBeforeEqualsExpression(modelelement: EqualsExpression);
    execAfterEqualsExpression(modelelement: EqualsExpression);

    execBeforeIfExpression(modelelement: IfExpression);
    execAfterIfExpression(modelelement: IfExpression);

    execBeforeIncomeType(modelelement: IncomeType);
    execAfterIncomeType(modelelement: IncomeType);

    execBeforeTaxPayerType(modelelement: TaxPayerType);
    execAfterTaxPayerType(modelelement: TaxPayerType);
}