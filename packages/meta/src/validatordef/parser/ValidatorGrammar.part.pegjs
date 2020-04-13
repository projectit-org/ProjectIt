{
    let create = require("./ValidatorCreators");
    let expCreate = require("../../languagedef/parser/ExpressionCreators");
}

Validator_Definition
  = ws "validator" ws validatorName:var ws "for" ws "language" ws languageName:var ws cr:(conceptRule)*
    {
        return create.createValidatorDef({
            "validatorName": validatorName,
            "languageName": languageName,
            "conceptRules": cr,
        });
    } 

validnameKey = "validName" ws
typecheckKey = "typecheck" ws
notEmptyKey = "notEmpty" ws
thisKey = "this" ws

conceptRule = conceptRef:conceptRef ws curly_begin ws rules:rule* curly_end 
    { 
        return create.createConceptRule({ 
          "conceptRef": conceptRef, 
          "rules": rules,
        }); 
    }

//conceptRef = name:var { return create.createConceptReference( { "name": name}); }

rule =  rule1: typeEqualsRule   { return rule1; }
      / rule2: typeConformsRule { return rule2; }
      / rule3: notEmptyRule     { return rule3; }
      / rule4: validNameRule    { return rule4; }

validNameRule = validnameKey property:langRefExpression? ws {
  return create.createValidNameRule( {
    "property": property
  });
}

notEmptyRule = notEmptyKey property:langRefExpression ws {
  return create.createNotEmptyRule( {
    "property": property
  })
}

typeEqualsRule = typecheckKey "equalsType" ws round_begin ws type1:langRefExpression ws comma_separator ws type2:langRefExpression ws round_end ws {
  return create.createTypeEqualsRule( {
    "type1": type1,
    "type2": type2,
  });
}

typeConformsRule = typecheckKey "conformsTo" ws round_begin ws type1:langRefExpression ws comma_separator ws type2:langRefExpression ws round_end ws {
  return create.createTypeConformsRule( {
    "type1": type1,
    "type2": type2,
  });
}
