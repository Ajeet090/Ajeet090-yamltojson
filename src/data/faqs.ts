export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: "How to convert YAML to JSON?",
    a: "To convert YAML to JSON online, paste your YAML text into the input field of our free YAML to JSON converter. The tool automatically parses the YAML structure and outputs clean, formatted JSON in real time. You can customize indentation, minify the output, or copy and download the JSON file directly."
  },
  {
    q: "When should I use YAML vs. JSON?",
    a: "Use YAML when human readability, conciseness, and configuration management are your priorities—such as in Kubernetes manifests, CI/CD pipelines, and app configuration files. Use JSON for API payloads, web data transfer, software serialization, and machine-to-machine communication where strict parsing speed and wide native language support are required."
  },
  {
    q: "How to convert JSON to YAML?",
    a: "You can convert JSON to YAML by selecting the 'JSON to YAML' tab on our online converter tool or clicking the 'Swap' button to reverse your existing conversion. Paste your JSON string into the input pane, and our converter instantly formats it into clean, indented YAML syntax."
  },
  {
    q: "What are the differences between YAML and JSON, and when should I use each?",
    a: "YAML relies on whitespace indentation, supports comments, and avoids explicit brackets or quotes, making it ideal for human-edited configuration files. JSON uses curly braces, brackets, and strict double-quoted keys, making it lighter and faster for web APIs to parse. Choose YAML for configs and deployment scripts, and JSON for API payloads and data storage."
  },
  {
    q: "How to convert a YAML file to JSON?",
    a: "To convert a YAML file to JSON, click the 'Upload File' button in our online YAML to JSON tool and select your .yaml or .yml file. The tool instantly parses the file content inside your browser and generates a formatted JSON file that you can download with a single click."
  },
  {
    q: "Can YAML be converted to JSON?",
    a: "Yes, YAML can be seamlessly converted to JSON because YAML is a superset of JSON. Almost every valid YAML data structure (maps, sequences, scalars) maps directly to JSON objects, arrays, and primitive data types."
  },
  {
    q: "How can I convert YAML to JSON in Python?",
    a: "In Python, use the pyyaml package to convert YAML to JSON. First run 'pip install pyyaml', then load the YAML data with yaml.safe_load(yaml_string) and serialize it to JSON using json.dumps(data, indent=2)."
  },
  {
    q: "Is YAML better than JSON?",
    a: "Neither format is universally 'better'—they serve different purposes. YAML is superior for human authoring and complex configuration management due to its readability and support for comments. JSON is superior for data interchange, performance, and universal programmatic parsing in web applications."
  },
  {
    q: "Should I use YML or YAML?",
    a: "Both .yml and .yaml refer to the exact same file format, so there is no functional difference. .yaml is the official recommended file extension by the YAML specification, but .yml is widely used due to historical 3-letter extension conventions. You can use either extension interchangeably."
  },
  {
    q: "How can I convert YAML to JSON using the command line?",
    a: "On the command line, you can convert YAML to JSON using tools like yq or Python. With yq, run 'yq -o=json config.yaml > output.json'. Alternatively, use Python's CLI module: python3 -c \"import sys, yaml, json; print(json.dumps(yaml.safe_load(sys.stdin), indent=2))\" < config.yaml."
  },
  {
    q: "Is YAML valid JSON?",
    a: "Standard JSON is valid YAML (specifically YAML 1.2), but valid YAML is not necessarily valid JSON. YAML features like indentation-based nesting, unquoted strings, anchor references, and comments are not allowed in standard JSON."
  },
  {
    q: "Is YAML just JSON?",
    a: "No, YAML is not just JSON, but YAML 1.2 is designed as a superset of JSON. This means any valid JSON document can be parsed as YAML, but YAML includes extended syntax such as custom tags, document markers (---), multiline scalar blocks, and comments that JSON does not support."
  },
  {
    q: "How can I convert a YAML file to JSON?",
    a: "Beyond online file upload, you can convert a YAML file to JSON using command-line CLI utilities (yq eval -o=json input.yaml), build scripts in Node.js (js-yaml library), or Python scripts (yaml.safe_load). This allows automated conversion inside CI/CD workflows and local terminal pipelines."
  },
  {
    q: "Do LLMs understand JSON or YAML better?",
    a: "Large Language Models (LLMs) parse both formats effectively, but YAML often saves tokens because it lacks redundant braces, quotes, and closing brackets. However, JSON is less prone to whitespace and indentation syntax errors when generated dynamically by LLMs, making JSON preferable for structured function calling."
  },
  {
    q: "How do I validate YAML?",
    a: "You can validate YAML by pasting your syntax into our free online YAML editor. The tool checks your indentation, syntax rules, and scalar values in real time, alerting you instantly with the exact line and column number of any syntax errors before performing conversion."
  }
];
