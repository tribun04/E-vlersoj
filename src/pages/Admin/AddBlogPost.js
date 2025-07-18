import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import {
    Form,
    Input,
    Button,
    Typography,
    Alert,
    Card,
    Row,
    Col,
    Divider,
    Upload,
    message,
    Select,
    Switch
} from 'antd';
import {
    UploadOutlined,
    PlusOutlined,
    MinusOutlined,
    SaveOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const createSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};

const AddBlogPost = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [tags, setTags] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleTitleChange = (e) => {
        const title = e.target.value;
        const slug = createSlug(title);
        form.setFieldsValue({ slug });
    };

    const handleTagClose = (removedTag) => {
        const newTags = tags.filter(tag => tag !== removedTag);
        setTags(newTags);
        form.setFieldsValue({ tags: newTags });
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && !tags.includes(inputValue)) {
            const newTags = [...tags, inputValue];
            setTags(newTags);
            form.setFieldsValue({ tags: newTags });
        }
        setInputVisible(false);
        setInputValue('');
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleUploadChange = (info) => {
        if (info.file.status === 'done') {
            // Here you would typically handle the uploaded file response
            // For demo, we'll just use a mock URL
            setImageUrl('https://example.com/uploaded-image.jpg');
            form.setFieldsValue({ coverImage: 'https://example.com/uploaded-image.jpg' });
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        setError('');
        try {
            await axiosInstance.post('/blogs', values);
            message.success('Postimi u krijua me sukses!');
            navigate('/admin/blog-posts');
        } catch (err) {
            setError(err.response?.data?.message || 'Ndodhi një gabim gjatë krijimit të postimit.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-container">
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <div className="flex items-center justify-between mb-6">
                        <Button
                            type="text"
                            icon={<ArrowLeftOutlined />}
                            onClick={() => navigate(-1)}
                            className="flex items-center"
                        >
                            Kthehu
                        </Button>
                        <Title level={3} className="mb-0">Krijo Postim të Ri</Title>
                        <div style={{ width: 100 }}></div> {/* Spacer for alignment */}
                    </div>
                </Col>
            </Row>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <Card className="mb-6">
                        {error && (
                            <Alert
                                message={error}
                                type="error"
                                showIcon
                                closable
                                className="mb-6"
                            />
                        )}

                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            initialValues={{
                                author: 'Admin',
                                status: 'draft',
                                featured: false
                            }}
                        >
                            <Form.Item
                                label="Titulli"
                                name="title"
                                rules={[{ required: true, message: 'Ju lutem, shkruani titullin!' }]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Titulli i postimit tuaj"
                                    onChange={handleTitleChange}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Slug (URL miqësore)"
                                name="slug"
                                rules={[{ required: true, message: 'Ju lutem, shkruani slug-un!' }]}
                                extra="URL unike për postimin tuaj"
                            >
                                <Input
                                    size="large"
                                    placeholder="ky-do-te-gjenerohet-automatikisht"
                                />
                            </Form.Item>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Kategoria"
                                        name="category"
                                    >
                                        <Select size="large" placeholder="Zgjidhni kategori">
                                            <Option value="technology">Teknologji</Option>
                                            <Option value="business">Biznes</Option>
                                            <Option value="health">Shëndetësi</Option>
                                            <Option value="education">Edukim</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Statusi"
                                        name="status"
                                    >
                                        <Select size="large">
                                            <Option value="draft">Draft</Option>
                                            <Option value="published">Publikuar</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                label="Përmbledhja (Excerpt)"
                                name="excerpt"
                                extra="Një përmbledhje e shkurtër që shfaqet në listën e blogjeve"
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Shkruani një përmbledhje tërheqëse..."
                                    maxLength={200}
                                    showCount
                                />
                            </Form.Item>

                            <Form.Item
                                label="Përmbajtja (Content)"
                                name="content"
                                rules={[{ required: true, message: 'Ju lutem, shkruani përmbajtjen!' }]}
                            >
                                <TextArea
                                    rows={12}
                                    placeholder="Shkruani përmbajtjen e plotë të artikullit këtu..."
                                    className="markdown-editor"
                                />
                            </Form.Item>

                            <Divider />

                            <Title level={5} className="mb-4">Meta të tjera</Title>

                            <Form.Item
                                label="Etiketat (Tags)"
                                name="tags"
                            >
                                <div className="tags-container">
                                    {tags.map(tag => (
                                        <span key={tag} className="tag">
                                            {tag}
                                            <MinusOutlined
                                                onClick={() => handleTagClose(tag)}
                                                className="tag-close"
                                            />
                                        </span>
                                    ))}
                                    {inputVisible ? (
                                        <Input
                                            type="text"
                                            size="small"
                                            className="tag-input"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            onBlur={handleInputConfirm}
                                            onPressEnter={handleInputConfirm}
                                            autoFocus
                                        />
                                    ) : (
                                        <span className="tag-add" onClick={showInput}>
                                            <PlusOutlined /> Shto Etiketë
                                        </span>
                                    )}
                                </div>
                            </Form.Item>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Imazhi Cover"
                                        name="coverImage"
                                        extra="Ngarko një imazh ose vendos një URL"
                                    >
                                        <Input
                                            size="large"
                                            placeholder="https://shembull.com/imazhi.jpg"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Ngarko Imazh"
                                        extra="Max 2MB, format JPG/PNG"
                                    >
                                        <Upload
                                            name="coverImageUpload"
                                            listType="picture"
                                            showUploadList={false}
                                            beforeUpload={beforeUpload}
                                            onChange={handleUploadChange}
                                        >
                                            <Button icon={<UploadOutlined />}>Zgjidhni File</Button>
                                        </Upload>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                label="Autori"
                                name="author"
                            >
                                <Input size="large" />
                            </Form.Item>

                            <Form.Item
                                label="Featured Post"
                                name="featured"
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>

                            <Divider />

                            <div className="flex justify-end gap-4">
                                <Button
                                    type="default"
                                    size="large"
                                    onClick={() => navigate('/admin/blog-posts')}
                                >
                                    Anulo
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    size="large"
                                    icon={<SaveOutlined />}
                                >
                                    Ruaj Postimin
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card title="Këshilla për shkrim" className="mb-6">
                        <div className="tips-list">
                            <div className="tip-item">
                                <Title level={5} className="tip-title">1. Titulli Tërheqës</Title>
                                <Text>
                                    Përdorni një titull që kap vëmendjen dhe përshkruan qartë përmbajtjen.
                                </Text>
                            </div>

                            <div className="tip-item">
                                <Title level={5} className="tip-title">2. Përmbledhje Efektive</Title>
                                <Text>
                                    Shkruani një përmbledhje të shkurtër që të bëjë lexuesit të duan të lexojnë më shumë.
                                </Text>
                            </div>

                            <div className="tip-item">
                                <Title level={5} className="tip-title">3. Përdorimi i Etiketave</Title>
                                <Text>
                                    Etiketat ndihmojnë në organizimin e përmbajtjes dhe përmirësojnë kërkimin.
                                </Text>
                            </div>

                            <div className="tip-item">
                                <Title level={5} className="tip-title">4. Imazhe me Cilësi</Title>
                                <Text>
                                    Përdorni imazhe me rezolucion të lartë që plotësojnë përmbajtjen.
                                </Text>
                            </div>
                        </div>
                    </Card>

                    <Card title="Parashtrimi i shpejtë">
                        <Text>
                            Përdorni këto butona për të shtuar elemente të zakonshme në përmbajtje:
                        </Text>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <Button size="small">Titull H2</Button>
                            <Button size="small">Titull H3</Button>
                            <Button size="small">Listë me pika</Button>
                            <Button size="small">Listë e numëruar</Button>
                            <Button size="small">Citat</Button>
                            <Button size="small">Linjë ndarëse</Button>
                            <Button size="small">Link</Button>
                            <Button size="small">Imazh</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AddBlogPost;