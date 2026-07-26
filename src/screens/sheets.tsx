import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback,
} from 'react-native';
import { colors, fonts, radius } from '@/theme';
import { Button } from '@/components/ui';
import { Field, ChecklistRow } from '@/components/cards';
import { useLang } from '@/context/LanguageContext';
import type { ServiceOrder } from '@/types';

type Check = 'ok' | 'fail' | 'none';

function useChecklist(keys: string[]) {
  const [state, setState] = useState<Record<string, Check>>(
    Object.fromEntries(keys.map((k) => [k, 'none']))
  );
  const set = (k: string, v: Check) => setState((s) => ({ ...s, [k]: v }));
  return { state, set };
}

/* ── CHECK-IN ── */
export function CheckinSheet({
  visible, onClose, onConfirm,
}: { visible: boolean; onClose: () => void; onConfirm: (o: ServiceOrder) => void }) {
  const { t } = useLang();
  const [plate, setPlate] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [service, setService] = useState('Lavagem Premium');
  const [client, setClient] = useState('');
  const cl = useChecklist(['dents', 'scratches', 'glass', 'parts']);

  function confirm() {
    if (!plate.trim()) return;
    onConfirm({
      service_order_id: Date.now().toString().slice(-10),
      vehicle_id: Date.now().toString().slice(-4),
      license_plate: plate.trim().toUpperCase(),
      make, model, color, service_name: service,
      vehicle_status: 'awaiting',
      service_order_payment_status: false,
    });
    setPlate(''); setMake(''); setModel(''); setColor(''); setClient('');
  }

  return (
    <Sheet visible={visible} onClose={onClose} title={t('checkin.title')} sub={t('checkin.sub')}>
      <Field label={t('checkin.plate')} value={plate} onChangeText={setPlate} placeholder="ABC-1234" autoCapitalize="characters" />
      <View style={styles.row}>
        <View style={{ flex: 1 }}><Field label={t('checkin.make')} value={make} onChangeText={setMake} placeholder="Honda" /></View>
        <View style={{ flex: 1 }}><Field label={t('checkin.model')} value={model} onChangeText={setModel} placeholder="Civic" /></View>
      </View>
      <Field label={t('checkin.color')} value={color} onChangeText={setColor} placeholder="Prata" />
      <Field label={t('checkin.clientName')} value={client} onChangeText={setClient} placeholder="Nome completo" />
      <Text style={styles.checkLabel}>{t('checkin.checklistIn')}</Text>
      <ChecklistRow name={t('checkin.dents')} value={cl.state.dents} onChange={(v) => cl.set('dents', v)} />
      <ChecklistRow name={t('checkin.scratches')} value={cl.state.scratches} onChange={(v) => cl.set('scratches', v)} />
      <ChecklistRow name={t('checkin.glass')} value={cl.state.glass} onChange={(v) => cl.set('glass', v)} />
      <ChecklistRow name={t('checkin.parts')} value={cl.state.parts} onChange={(v) => cl.set('parts', v)} />
      <View style={{ height: 16 }} />
      <Button label={t('detail.confirmCheckin')} variant="success" onPress={confirm} />
      <Button label={t('common.cancel')} variant="ghost" onPress={onClose} />
    </Sheet>
  );
}

/* ── CHECK-OUT ── */
export function CheckoutSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { t } = useLang();
  const [plate, setPlate] = useState('');
  const [total, setTotal] = useState('');
  const cl = useChecklist(['paint', 'wheels', 'glass', 'vacuum', 'dashboard']);

  return (
    <Sheet visible={visible} onClose={onClose} title={t('checkout.title')} sub={t('checkout.sub')}>
      <Field label={t('checkin.plate')} value={plate} onChangeText={setPlate} placeholder="ABC-1234" autoCapitalize="characters" />
      <Text style={styles.checkLabel}>{t('checkout.checklistOut')}</Text>
      <ChecklistRow name={t('checkout.paint')} value={cl.state.paint} onChange={(v) => cl.set('paint', v)} />
      <ChecklistRow name={t('checkout.wheels')} value={cl.state.wheels} onChange={(v) => cl.set('wheels', v)} />
      <ChecklistRow name={t('checkout.glass')} value={cl.state.glass} onChange={(v) => cl.set('glass', v)} />
      <ChecklistRow name={t('checkout.vacuum')} value={cl.state.vacuum} onChange={(v) => cl.set('vacuum', v)} />
      <ChecklistRow name={t('checkout.dashboard')} value={cl.state.dashboard} onChange={(v) => cl.set('dashboard', v)} />
      <View style={{ height: 14 }} />
      <Field label={t('checkout.total')} value={total} onChangeText={setTotal} placeholder="0,00" keyboardType="numeric" />
      <Button label="✓ Check-out" variant="primary" onPress={onClose} />
      <Button label={t('common.cancel')} variant="ghost" onPress={onClose} />
    </Sheet>
  );
}

/* ── Bottom sheet shell ── */
function Sheet({
  visible, onClose, title, sub, children,
}: {
  visible: boolean; onClose: () => void; title: string; sub: string; children: React.ReactNode;
}) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheet}>
              <View style={styles.handle} />
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.sub}>{sub}</Text>
              <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 36, maxHeight: '90%' },
  handle: { width: 36, height: 4, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 2, alignSelf: 'center', marginBottom: 18 },
  title: { fontSize: 18, color: colors.text, fontFamily: fonts.bodyBold, marginBottom: 4 },
  sub: { fontSize: 13, color: colors.text2, marginBottom: 18 },
  row: { flexDirection: 'row', gap: 10 },
  checkLabel: { fontSize: 10, color: colors.text3, textTransform: 'uppercase', letterSpacing: 1, fontFamily: fonts.bodyBold, marginBottom: 8, marginTop: 4 },
});
